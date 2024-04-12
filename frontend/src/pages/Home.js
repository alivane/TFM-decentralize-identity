import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Typography variant="h4">Welcome to the HomePage</Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        component={Link}
        to="/signup"
      >
        Register/Generate key
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to="/signin"
      >
        Sign In
      </Button>
    </Container>
  );
}

export default HomePage;
