import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import logo from '../logo.png'; // Import your logo image

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: "0 auto",
    width: 200, // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    cursor: 'pointer', // Change cursor to pointer to indicate clickable
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <Link to="/">
      <img src={logo} alt="Logo" className={classes.logo} />
    </Link>
  );
}

export default Logo;
