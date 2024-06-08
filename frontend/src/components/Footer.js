import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

const useStyles = makeStyles((theme) => ({
  footer: {
    // height: "10vh",
    // backgroundColor: 'rgba(0, 0, 0, 0.54)',
    // color: '#fff',
    textAlign: 'center',
    padding: "1%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    // top: "100px"
    // height: "30px",
    // minHeight: "30px",
    // backgroundColor: "#000",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
  },
  icon: {
    marginRight: "0.5px",
    marginLeft: "0.5px",
    verticalAlign: 'middle',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <p>&copy; {new Date().getFullYear()} Expid Application. All Rights Reserved.</p>
      <p>
        <Link href="https://github.com/alivane/TFM-decentralize-identity" target="_blank" rel="noopener noreferrer" color="inherit">
          <GitHubIcon className={classes.icon} /> GitHub
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
