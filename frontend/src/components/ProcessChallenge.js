import React, { useEffect, useState,
  //  useRef 
  } from 'react';
import { useNavigate } from "react-router-dom";
import forge from 'node-forge';
import { Button, 
  Typography, 
  Box, 
  Container, 
  // Dialog, 
  Paper,
  // DialogTitle, 
  // DialogContent, 
  Tooltip,
  TextField,
  IconButton,
  // DialogActions
 } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import InfoIcon from '@mui/icons-material/Info';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { 
  // postFileIPFS, 
  generateRandomCode, 
  verifySignature,
  getPublicKeybyDid,
  getDidByPublicKey
} from "../api";
import Loader from "./Loader";
// import FooterSteps from "./FooterSteps";
import ErrorComponent from "./ErrorComponent";
import SuccessComponent from "./SuccessComponent";
// import SignInLink from "./SignInLink";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CopyText from "./CopyText";
import { createRSA, 
  // encryptMessageForMultipleRecipients, 
  examplecreateSignature } from '../utils/cryptoFunctions';
import { saveToLocalStorage,
  //  loadFromLocalStorage, 
   downloadFile } from '../utils/utils';
import FileUpload from "../components/FileUpload";
import { 
  // SIGNUP_STEPS, 
  VERIFY_CODE_PROCESS, SIGNUP_GUIDE_STEPS, GENERAL_GUIDE_STEPS, SIGNITURE_GUIDE_STEPS } from '../utils/constants';
import GuidedTour from '../components/GuideTour';
import { useAuth } from './AuthContext';
import Instruction from './InstructionsSignature';


const useStyles = makeStyles((theme) => ({
  container: {
    // marginTop: theme.spacing(4),
    textAlign: 'center',
    width: '100%',
    // height: "100vh",
    display: "flex!important",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    margin: "2% auto!important",
    padding: "20px !important",
    width: "100%"
  },
  containerDialog: {
    textAlign: 'center',
    display: "flex!important",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    // marginRight: "1%",
  },
  display: {
    display:"flex"
  }
}));


function ProcessChallenge(props) {
  const {
    signup = false,
    setActiveStep,
    extraData = {}
  } = props;

  const classes = useStyles();
  const { 
    // isLoggedIn,
     login } = useAuth();
  // console.log(isLoggedIn, "=isLoggedIn")

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogSign, setOpenDialogSign] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [selectedFileSign, setSelectedFileSign] = useState(null);
  
  const [verify, setVerify] = useState({ code: 0 });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(false);
  const [successResponse, setSuccessResponse] = useState(false);
  // const [activeStep, setActiveStep] = useState(0);
  const [publicKey, setPublicKey] = useState(null);
  // const [secretKey, setSecretKey] = useState("");
  const [did, setDid] = useState();

  // const [email, setEmail] = useState('');
  // State variable to store whether the email is valid or not
  // const [isValidEmail, setIsValidEmail] = useState(null);

  const navegate = useNavigate();


  // Regular expression for email validation
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handler function to update email state and validate email format
  // const handleEmailChange = (event) => {
  //   const newEmail = event.target.value;
  //   setEmail(newEmail);
  //   setIsValidEmail(emailRegex.test(newEmail)); // Check if the new email matches the regex
  // };
  


  useEffect(() => {
    if (verify.code === VERIFY_CODE_PROCESS[0]) {
      async function fetchData() {
        try {
          const resData = await generateRandomCode();
          setResponse(resData);
          setVerify({
            code: VERIFY_CODE_PROCESS[1],
            data: {
              fileContent: resData
            }
          });
          setActiveStep(1);
          setOpenDialog(false);
        } catch (error) {
          setErrorResponse(error.toString());
          setActiveStep(0);
          setVerify({ code: 0 });
        } finally {
          setOpenDialog(false);
          setLoading(false);
        }
      }
      fetchData();
    }


    if (verify.code === VERIFY_CODE_PROCESS[2]) {
      async function fetchData() {
        try {
          const resData = await verifySignature(
            signup,
            verify.data.fileContent,
            verify.data.signature,
            verify.data.publicKey,
            extraData
          );
          // console.log(resData.data, "========")
          // setResponse(resData);
          if (signup) {
            setVerify({
              code: VERIFY_CODE_PROCESS[3],
              data: {
                ...verify.data,
                cid: resData.data.cid,
                did: resData.data.did,
              }
            });
          } else {
            login();
            saveToLocalStorage("did", forge.util.encode64(did));
            navegate('/home'); // Redirect to the dashboard after login
          }
          
          setSuccessResponse(resData.message);
          setErrorResponse(false);
          setActiveStep(2);
        } catch (error) {
          setActiveStep(1);
          setErrorResponse(error.toString());
        } finally {
          setOpenDialogSign(false);
          setLoading(false);
        }
      }
      fetchData();
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verify]);

  const triggerProcessSignature = (result) => {
    const binaryString = String.fromCharCode(...new Uint8Array(result));
    const dataUser = {
      version: 1,
      publicKey: publicKey,
      signature: binaryString,
      // email: email
    };
    setVerify({
      code: VERIFY_CODE_PROCESS[2],
      data: {
        ...verify.data,
        ...dataUser
      }
    });
  }

  const triggerProcessPublicKey = async (value) => {

    try {
      setPublicKey(value);
      if (!signup) {

        const result = await getDidByPublicKey(value);
        setDid(forge.util.decode64(result.data.did));
      }
      setVerify({
        code: VERIFY_CODE_PROCESS[0],
        data: null
      });
    } catch (error) {
      setErrorResponse(error.toString());
    }

    
    // setPublicKey(result);
    // setVerify({
    //   code: VERIFY_CODE_PROCESS[0],
    //   data: null
    // });
  }


  const triggerInitProcess = async () => {
    try {
      setLoading(true);
      const result = await getPublicKeybyDid(did);
      // console.log(result.data.publicKey[0], "=============result.data.publicKey[0]")
      setPublicKey(forge.util.decode64(result.data.publicKey[0]));
      setVerify({
        code: VERIFY_CODE_PROCESS[0],
        data: null
      });
    } catch (error) {
      setErrorResponse(error.toString());
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <Container className={classes.container} component="main" maxWidth="md">
      {
        errorResponse && (
          <ErrorComponent
            open={true} 
            errorMessage={errorResponse} 
            onClose={() => setErrorResponse(null)} 
          />
        )
      }
      {
        successResponse && (
          <SuccessComponent 
            successMessage={successResponse} 
            onClose={() => setSuccessResponse(null)}
          />
        )
      }
      <Paper elevation={3} sx={{pl:4, pr: 4, pt:10, pb:10}}>    
        
      {
        loading && (
          <Loader />
        )
      }
      {
        verify.code === 0 && (
            <div>

              {
                signup ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={`${classes.button} generate_keys`}
                    disabled={loading}
                    onClick={() => createRSA()}
                    startIcon={<DownloadIcon className={classes.icon} />}
                  >
                    (optional) Generate Key Pair
                  </Button>
                ) : (
                  <div>
                  <div className={classes.display}>
                    <TextField
                      className='enter_did_subject'
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="did"
                      label="Enter with DID subject"
                      name="did"
                      autoComplete="false"
                      value={did}
                      onChange={(event) => setDid(event.target.value)}
                    />
                    <Tooltip title="This is where you can enter your Decentralized Identifier (DID), example: did:key:6ffc1def15badd32e5e4e2173be3c407">
                      <IconButton><InfoIcon /></IconButton>
                    </Tooltip>
                  </div>
                  <Button
                    disabled={!did || did.length < 5 || loading}
                    variant="contained"
                    color="secondary"
                    // className={classes.button}
                    className={`${classes.button} next_did_button`}
                    onClick={() => triggerInitProcess()}
                    startIcon={<ArrowForwardIcon className={classes.icon} />}
                  >
                    Next
                  </Button>
                  </div>
                )
              }
              <Typography variant="h5" sx={{textAlign: 'center'}}>or</Typography>
              <FileUpload
                triggerProcess={triggerProcessPublicKey}
                setLoading={setLoading}
                loading={loading}
                setOpenDialog={setOpenDialog}
                openDialog={openDialog}
              />

            {
              signup ?
              <GuidedTour steps={SIGNUP_GUIDE_STEPS} />
              : <GuidedTour steps={GENERAL_GUIDE_STEPS} />
            }
            </div>
        )
      }
      {
        (verify.code === VERIFY_CODE_PROCESS[1] ||
        verify.code === VERIFY_CODE_PROCESS[2]) && (
          <div>
            {/* downloadFile */}
            <Box sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr' },
                gap: 1,
              }}>
              
              
                <Typography variant="h4" color="secondary">Please sign this document with your private key to verify your identity.</Typography>
                <Instruction />
                <Button
                    variant="contained"
                    color="secondary"
                    className={`${classes.button} sign_file`}
                    onClick={() => {
                      downloadFile("EXPID_file_challenge.expid", response);
                      // console.log("response")
                      examplecreateSignature("_", response);
                    }}
                    startIcon={<CreateIcon className={classes.icon} />}
                  >
                  (1) Sign file!
                </Button>

                <FileUpload
                  triggerProcess={triggerProcessSignature}
                  setOpenDialog={setOpenDialogSign}
                  openDialog={openDialogSign}
                  setLoading={setLoading}
                  loading={loading}
                  binaryFile={true}
                  // typeFile={".p7s,.p7b,.p7m,.signed,.bin,.sha256"}
                  typeFile={".signed, .bin"}
                  titleButton="(2) Verify Sign!"
                  classStepButton={`verify_sign`}
                  titleDialog="Do you want to upload this Signature file?"
                  iconButton={<CheckCircleIcon className={classes.icon}/>}
                />
                  
            </Box>

            <GuidedTour steps={SIGNITURE_GUIDE_STEPS} />

          </div>
        )
      }

      {
        verify.code === VERIFY_CODE_PROCESS[3] && (
          <div>
            <Box sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr' },
                gap: 1,
              }}>
              
              {
                loading ? (
                  <Loader />
                ) : (
                  <div>
                    <EmojiEventsIcon color="secondary" fontSize="large" />
                    <Typography variant="h4" color="secondary">
                      You are already registered!
                    </Typography>
                    <Typography variant="h6" color="black">
                      <CopyText text={verify.data.did} length={30} />
                      (KEEP IT WITH YOU for sign in!)
                    </Typography>
                  </div>
                )
              }
            </Box>
            
          </div>
        )
      }
        
      </Paper>
    
      {/* <FooterSteps
        activeStep={activeStep}
        steps={steps}
      /> */}
      
    </Container>
  );
}

export default ProcessChallenge;
