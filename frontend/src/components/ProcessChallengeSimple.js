import React, { useEffect, useState,
  //  useRef
   } from 'react';
// import { useNavigate } from "react-router-dom";
import forge from 'node-forge';
import { Button, 
  Typography, 
  Box, 
  Container, 
  Paper,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import { 
  generateRandomCode, 
  verifySignatureByDid,
} from "../api";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import SuccessComponent from "./SuccessComponent";

import CopyText from "./CopyText";
import { examplecreateSignature } from '../utils/cryptoFunctions';
import {  loadFromLocalStorage, downloadFile } from '../utils/utils';
import FileUpload from "../components/FileUpload";
import { VERIFY_CODE_PROCESS, SIGNITURE_GUIDE_STEPS } from '../utils/constants';
import GuidedTour from '../components/GuideTour';
// import { useAuth } from './AuthContext';
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
    setActiveStep,
    extraData = {},
    typeApi="offer"
  } = props;

  const classes = useStyles();
  // const { 
  //   // isLoggedIn, 
  //   // login 
  // } = useAuth();
  // console.log(isLoggedIn, "=isLoggedIn")

  // const [openDialog, setOpenDialog] = useState(false);
  const [openDialogSign, setOpenDialogSign] = useState(false);
  const [did, setDid] = useState("");
  
  const [verify, setVerify] = useState({ code: 0 });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(false);
  const [successResponse, setSuccessResponse] = useState(false);
  // const navegate = useNavigate();

  useEffect(() => {
    const didSubject = loadFromLocalStorage("did");
    setDid(forge.util.decode64(didSubject));
    setVerify({
      code: VERIFY_CODE_PROCESS[0],
      data: {
        didSubject: forge.util.decode64(didSubject)
      }
    })
    // console.log("entro una vez", didSubject)
  }, []);



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
          setOpenDialogSign(false);
        } catch (error) {
          setErrorResponse(error.toString());
          setActiveStep(0);
          setVerify({ code: 0 });
        } finally {
          setOpenDialogSign(false);
          setLoading(false);
        }
      }
      fetchData();
    }


    if (verify.code === VERIFY_CODE_PROCESS[2]) {
      // console.log("ENTRA A 2")
      async function fetchData() {
        try {
          const resData = await verifySignatureByDid(
            verify.data.fileContent,
            verify.data.signature,
            did,
            extraData,
            typeApi
          );
          // console.log(resData.data, "========DATA")
          // setResponse(resData);
          // if (signup) {
          //   setVerify({
          //     code: VERIFY_CODE_PROCESS[3],
          //     data: {
          //       ...verify.data,
          //       cid: resData.data.cid,
          //       did: resData.data.did,
          //     }
          //   });
          // } else {
          //   login();
          //   navegate('/home'); // Redirect to the dashboard after login
          // }
          
          setSuccessResponse(resData.message);
          setErrorResponse(false);
          setActiveStep(2);
        } catch (error) {
          setVerify({
            ...{
              code: VERIFY_CODE_PROCESS[1],
              data: {
                fileContent: verify.data.fileContent
              }
            },
          });
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
    // console.log("hhheere")
    const binaryString = String.fromCharCode(...new Uint8Array(result));
    const dataUser = {
      version: 1,
      // did_subject: did_subject,
      signature: binaryString,
    };
    setVerify({
      code: VERIFY_CODE_PROCESS[2],
      data: {
        ...verify.data,
        ...dataUser
      }
    });

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
        (loading || verify.code === VERIFY_CODE_PROCESS[0]) && (
          <Loader />
        )
      }

      {
         verify.code === VERIFY_CODE_PROCESS[1] && <div>
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
         <CopyText text={did} length={30} />
         <GuidedTour steps={SIGNITURE_GUIDE_STEPS} />

       </div>
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
