import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, makeStyles, Button, IconButton } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import { clearLocalStorage } from '../utils/utils';
import { encode64 } from '../utils/cryptoFunctions';

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: {
    marginTop: '16px',
  },
}));

function UserInfo({ firstName, lastName, email, documentId, onLogout }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigate('/');
  };

  const handleEdit = (field, name, value) => {
    // Navigate to the edit page with the specific 
    const data = encode64(JSON.stringify({
      key: field,
      value: value, 
      name: name
    }));
    // console.log(data, "=data")

    navigate(`/edit-user/${data}`);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} className={classes.userInfoItem}>
          <Typography variant="body1"><PersonIcon className={classes.icon} /> <strong>First Name:</strong> {firstName}</Typography>
          <IconButton onClick={() => handleEdit('name', "First Name", firstName)}><EditIcon /></IconButton>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.userInfoItem}>
          <Typography variant="body1"><PersonIcon className={classes.icon} /> <strong>Last Name:</strong> {lastName}</Typography>
          <IconButton onClick={() => handleEdit('last_name', "Last Name", lastName)}><EditIcon /></IconButton>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.userInfoItem}>
          <Typography variant="body1"><EmailIcon className={classes.icon} /> <strong>Email Address:</strong> {email}</Typography>
          <IconButton onClick={() => handleEdit('email', "Email", email)}><EditIcon /></IconButton>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.userInfoItem}>
          <Typography variant="body1"><DescriptionIcon className={classes.icon} /> <strong>Document Number:</strong> {documentId}</Typography>
          <IconButton onClick={() => handleEdit('document_id', "Document Number", documentId)}><EditIcon /></IconButton>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleLogout} className={classes.logoutButton}>Logout</Button>
    </Container>
  );
}

export default UserInfo;
