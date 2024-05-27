import React from 'react';
import { Container, Typography, Grid, makeStyles, Button } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { clearLocalStorage } from '../utils/utils';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '20px',
    marginTop: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    marginRight: '8px',
  },
  userInfoItem: {
    marginBottom: '16px',
  },
  logoutButton: {
    marginTop: '16px',
  },
}));

function UserInfo({ firstName, lastName, email, documentId, onLogout }) {
  const classes = useStyles();

  const handleLogout = () => {
    // Call the logout function passed as a prop
    onLogout();
    clearLocalStorage();
  };

  return (
    <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} className={classes.userInfoItem}>
            <Typography variant="body1"><PersonIcon className={classes.icon} /> <strong>First Name:</strong> {firstName}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.userInfoItem}>
            <Typography variant="body1"><PersonIcon className={classes.icon} /> <strong>Last Name:</strong> {lastName}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.userInfoItem}>
            <Typography variant="body1"><EmailIcon className={classes.icon} /> <strong>Email Address:</strong> {email}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.userInfoItem}>
            <Typography variant="body1"><DescriptionIcon className={classes.icon} /> <strong>Document ID:</strong> {documentId}</Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleLogout} className={classes.logoutButton}>Logout</Button>

    </Container>
  );
}

export default UserInfo;
