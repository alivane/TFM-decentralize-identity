import React from 'react';
// import { Link } from 'react-router-dom';
import { 
  // Button, 
  Container, Typography,
  //  Paper 
  } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Import the EmojiEmotions icon
import Logo from "../components/Logo";
// import GuidedTour from '../components/GuideTour';
// import { HOME_STEPS } from '../utils/constants';
// import { useParams } from 'react-router-dom';
// import { getValidationVerifiableCredential, getCredential } from '../api';
// import { Typography, Paper } from '@mui/material';
// import Loader from '../components/Loader';
// import ErrorComponent from "../components/ErrorComponent";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { NAME_FIELDS_VC} from "../utils/constants"
// import { isSingleWord } from '../utils/utils';
// import CopyText from '../components/CopyText';
// import { decode64, encode64 } from '../utils/cryptoFunctions';
import ReaderQr from '../components/ReaderQR';


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


function ScanQR() {
  const classes = useStyles();
  
  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Logo />
      <Typography variant="h4" className={classes.welcomeText}>
        Welcome!
        {/* {id} */}
        {/* <EmojiEmotionsIcon className={classes.icon} /> */}
      </Typography>
      <ReaderQr />
    </Container>
  );
}
// ip route get 1.2.3.4 | awk '{print $7}'
export default ScanQR;
