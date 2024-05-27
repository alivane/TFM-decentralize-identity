import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Import the EmojiEmotions icon
import Logo from "../components/Logo";
import GuidedTour from '../components/GuideTour';
import { HOME_STEPS } from '../utils/constants';


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

function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Logo />
      <Typography variant="h4" className={classes.welcomeText}>
        Welcome!
        {/* <EmojiEmotionsIcon className={classes.icon} /> */}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={`${classes.button} create_account_button`}
        component={Link}
        to="/signup"
        startIcon={<AccountCircleIcon className={classes.icon} />}
      >
        Create an Account
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={`${classes.button} login_button`}
        component={Link}
        to="/signin"
        startIcon={<LockOpenIcon className={classes.icon} />}
      >
        Login
      </Button>
      <GuidedTour steps={HOME_STEPS} />
    </Container>
  );
}

export default HomePage;
