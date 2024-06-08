import React from 'react';
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: "center !important",
    padding: "1% !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignContent: "center !important",
    flexDirection: "column !important",
    position: "fixed !important",
    bottom: "0 !important",
    left: "0 !important",
    width: "100vw !important",
  },
  icon: {
    marginRight: "0.5px",
    marginLeft: "0.5px",
    verticalAlign: 'middle',
  },
}));


const Footer = () => {
  const classes = useStyles();

  return (
    <div
      // style={{
      //   textAlign: "center !important",
      //   padding: "1% !important",
      //   display: "flex !important",
      //   justifyContent: "center !important",
      //   alignContent: "center !important",
      //   flexDirection: "column !important",
      //   position: "fixed !important",
      //   bottom: "0 !important",
      //   left: "0 !important",
      //   width: "100vw !important",
      // }}
      style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        bottom: 0,
        left: 0,
        position: "fixed",
        width: "100vw"
      }}
    >

        <p>&copy; {new Date().getFullYear()} Expid Application. All Rights Reserved.</p>
        <p>
          <Link href="https://github.com/alivane/TFM-decentralize-identity" target="_blank" rel="noopener noreferrer" color="inherit">
            <GitHubIcon className={classes.icon} /> GitHub
          </Link>
        </p>
    </div>
  );
}

export default Footer;
