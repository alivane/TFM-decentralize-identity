import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
  },
}));

function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.loaderContainer}>
      <CircularProgress />
    </div>
  );
}

export default Loader;
