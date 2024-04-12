import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <Grid item xs={12} align="center">
        <Typography variant="h1" gutterBottom>
          404 Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you're looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go back to Home
        </Button>
        <img src="/404-image.jpg" alt="404 Not Found" className={classes.image} />
      </Grid>
    </Grid>
  );
}

export default NotFound;
