import React, { useEffect, useState } from 'react';

import {
  Typography, 
  Box, 
  Container,
  Paper, 
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { generateRandomCode, verifySignature } from "../api";
import FooterSteps from "../components/FooterSteps";
import ErrorComponent from "../components/ErrorComponent";
import SuccessComponent from "../components/SuccessComponent";
import SignInLink from "../components/SignInLink";
import ProcessChallenge from "../components/ProcessChallenge";
import Logo from '../components/Logo';
import { SIGNUP_STEPS, VERIFY_CODE_PROCESS } from '../utils/constants';
import SignupForm from '../components/FormSignup';

const useStyles = makeStyles((theme) => ({
  container: {
    // marginTop: theme.spacing(4),
    textAlign: 'center',
    width: '100%',
    height: "100vh",
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

function SignUp() {
  const classes = useStyles();

  const [verify, setVerify] = useState({ code: 0 });
  const [errorResponse, setErrorResponse] = useState(false);
  const [successResponse, setSuccessResponse] = useState(false);
  // const [dataUserForm, setDataUserForm] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    documentId: '',
  });

  const updateActiveStep = (value) => {
    setActiveStep(value+1);
  }

  const onClickNext = (value) => {
    // console.log("test", value);
    // setDataUserForm(value);
    updateActiveStep(0);
  }

  useEffect(() => {
    if (verify.code === VERIFY_CODE_PROCESS[0]) {
      async function fetchData() {
        try {
          const resData = await generateRandomCode();
          setVerify({
            code: VERIFY_CODE_PROCESS[1],
            data: {
              fileContent: resData
            }
          });
          updateActiveStep(1);
        } catch (error) {
          setErrorResponse(error.toString());
          updateActiveStep(0);
          setVerify({ code: 0 });
        }
      }
      fetchData();
    }


    if (verify.code === VERIFY_CODE_PROCESS[2]) {
      async function fetchData() {
        try {
          const resData = await verifySignature(
            true,
            verify.data.fileContent,
            verify.data.signature,
            verify.data.publicKey,
          );
          setVerify({
            code: VERIFY_CODE_PROCESS[3],
            data: {
              ...verify.data,
              cid: resData.data.cid,
              did: resData.data.did,
            }
          });
          
          setSuccessResponse(resData.message);
          setErrorResponse(false);
          updateActiveStep(2);
        } catch (error) {
          updateActiveStep(1);
          setErrorResponse(error.toString());
        }
      }
      fetchData();
      
    }
  }, [verify]);

  
  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Logo />
      {
        errorResponse && (
          <ErrorComponent errorMessage={errorResponse} />
        )
      }
      {
        successResponse && (
          <SuccessComponent successMessage={successResponse} />
        )
      }
      <div>
        <Typography variant="h4">Sign Up</Typography>
        

        <Box sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.default',
          display: 'grid',
          gridTemplateColumns: { md: '1fr' },
          gap: 1,
        }}>

        {
          activeStep == 0 ?
            <Paper elevation={3} sx={{pl:4, pr: 4, pt:10, pb:10}}>    
            <SignupForm
              onClickNext={onClickNext}
              setFormValues={setFormValues}
              formValues={formValues}
            /> 
            </Paper>
          :
          <ProcessChallenge
            steps={SIGNUP_STEPS} signup={true}
            setActiveStep={updateActiveStep}
            extraData={formValues}
          />
        }
        <SignInLink />
        <FooterSteps
          activeStep={activeStep}
          steps={SIGNUP_STEPS}
        />

      </Box>
      </div>
    </Container>
  );
}

export default SignUp;
