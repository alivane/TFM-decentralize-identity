// SignIn.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getFileContentFromIPFS } from '../api';
import { decryptRSA } from '../components/cryptoFunctions';
import Loader from "../components/Loader";
import AlarmMessage from "../components/AlarmMessage"

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: "100vh",
    display: "flex!important",
    flexDirection: "column",
    justifyContent: "center",
  },
  form: {
    width: '100%',
    display: "flex",
    flexDirection: "column"
  },
  button: {
    margin: "2% auto!important",
    padding: "20px !important",
    width: "100%"
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
}));
function SignIn() {
  const classes = useStyles();
  const [ipfsHash, setIpfsHash] = useState("");
  const [privateCode, setPrivateCode] = useState("");
  const [response, setResponse] = useState(null);
  const [showAlarm, setShowAlarm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();


  const handleSubmit = async() => {
    setLoading(true);
    if (response) {
      const resolvePrivateCode = decryptRSA(process.env.REACT_APP_PRIVATE_KEY, response.privateCodeWeb);

      if (resolvePrivateCode === privateCode) {
        navigate('/home');
      } else {
        setShowAlarm(true);
      }

    }
    setLoading(false);
    
  }

  const handleNextStep = async () => {
    setLoading(true);
    try {
      // console.log(`${process.env.REACT_APP_GATEWAY_URL}/ipfs/${ipfsHash}`)
      const resData = await getFileContentFromIPFS(ipfsHash);
      const jsonString = JSON.parse(resData);
      setResponse(jsonString);
      setStep(2);
    } catch (error) {
      console.log("Error: ", error)
    }
    setLoading(false);
  }

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <AlarmMessage
        open={showAlarm} 
        onClose={() => setShowAlarm(false) }
        message={"The private code does not match"}
      />
      <Typography variant="h4">Sign In</Typography>
      { loading && <Loader />}
      <form className={classes.form} noValidate>
        {
          step === 1 ? (
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="hash"
                label="HASH Address"
                name="hash"
                autoComplete="false"
                autoFocus
                value={ipfsHash}
                onChange={(event) => setIpfsHash(event.target.value)}
              />
              <Button
                // type="submit"
                fullWidth
                disabled={!ipfsHash || loading}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleNextStep}
              >
                Next
              </Button>
            </div>
          ) : (
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="privateCode"
                label="Private Code"
                name="PrivateCode"
                autoComplete="false"
                autoFocus
                value={privateCode}
                onChange={(event) => setPrivateCode(event.target.value)}
              />
              <Button
                // type="submit"
                fullWidth
                disabled={privateCode.length === 0 || loading}
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </div>
          )
        }
        <Typography variant="body2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </form>
    </Container>
  );
}

export default SignIn;
