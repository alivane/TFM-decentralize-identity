import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import {
  //  Button, 
  Container, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Import the EmojiEmotions icon
import Logo from "../components/Logo";
// import GuidedTour from '../components/GuideTour';
// import { HOME_STEPS } from '../utils/constants';
import { useParams } from 'react-router-dom';
import { getValidationVerifiableCredential, getCredential } from '../api';
// import { Typography, Paper } from '@mui/material';
import Loader from '../components/Loader';
import ErrorComponent from "../components/ErrorComponent";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { NAME_FIELDS_VC} from "../utils/constants"
import { isSingleWord } from '../utils/utils';
import CopyText from '../components/CopyText';
import { decode64, encode64 } from '../utils/cryptoFunctions';


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
    padding: "20px!important",
    width: "80%"
  },
  welcomeText: {
    // marginBottom: theme.spacing(4),
    // color: theme.palette.primary.main, // Set the color to the primary color of your theme
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

const renderTypographyFromJSON = (data) => {
  return Object.entries(data).map(([key, value]) => (
    <div key={key}>
      <Typography variant="body1">
          
        {
          (
            isSingleWord(key, "did") || 
            isSingleWord(key, "id") || 
            isSingleWord(key, "did_buyer") ||
            isSingleWord(key, "did_seller")
          ) ? (
            <div>
              <Typography sx={{ fontWeight: 'bold' }}>{NAME_FIELDS_VC[key]}: </Typography>
              <CopyText text={`${value}`} />
            </div>
           
            
          ) : (
          
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Typography sx={{ fontWeight: 'bold' }}>
              {NAME_FIELDS_VC[key]}: 
              </Typography>
              {value}
            </div>
          )
        }
      </Typography>
    </div>
  ));
};


function VerifyCredentials() {
  const classes = useStyles();
  const { id } = useParams(); // Get the ID parameter from the URL
  const [data, setData] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);

  useEffect(() => {
    if (id) {
      // console.log("id", id)
      const fetchData = async () => {
        try {
          // console.log( "=credential");
          const hash = JSON.parse(decode64(id));
          // console.log(hash, "=hash", hash.credential_id)
          const credential = await getCredential(hash.credential_id);
          
          const params = {
            credential: credential.data,
            share: hash.share,
            did: hash.did
          }
          // console.log(credential, "===credential", credential);

          const result = await getValidationVerifiableCredential(
            encode64(JSON.stringify(params))
          );
          // console.log(result, "====data");
          setData(result.data)
        } catch (error) {
          console.error('Error fetching credential:', error);
          // console.log(error, "=error")
          setErrorResponse(error.toString());
        }
      };
  
      fetchData(); // Call the function immediately
    }
  }, [id]); // Include id in the dependency array if it's used inside the effect


  return (
    <Container style={{
      textAlign: 'center',
      width: '100%',
      height: "100vh",
      display: "flex !important",
      flexDirection: "column",
      justifyContent: "center",
    }} component="main" maxWidth="md">
      <Logo />
      <Typography variant="h4" className={classes.welcomeText}>
        Welcome!
        {/* {id} */}
        {/* <EmojiEmotionsIcon className={classes.icon} /> */}
      </Typography>
      <div>
      {
        errorResponse && (
          <ErrorComponent errorMessage={errorResponse} open={true} />
        )
      }
      {data ? (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <h1>Verify Credential <CheckCircleIcon sx={{ color: "green" }} /></h1>
          {/* <Typography variant="body1">Currency Sell: {data.currency_sell_value} {data.currency_sell}</Typography>
          <Typography variant="body1">Currency Cost: {data.currency_cost_value}  {data.currency_cost}</Typography>
          <Typography variant="body1">Country of Exchange: {data.country_of_exchange}</Typography> */}
          {
            renderTypographyFromJSON(data)
          }
          </Paper>
      ) : (
        <div>
          <h1>Verifying Credential...</h1>
          <Loader />
        </div>
      )}
    </div>
      
    </Container>
  );
}

export default VerifyCredentials;
