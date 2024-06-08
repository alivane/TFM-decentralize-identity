import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper } from '@material-ui/core';
import UserInfo from '../components/UserInfo'; // Assuming you have already created the UserInfo component
import { getProfileByDid, deleteProfile } from '../api';
import { loadFromLocalStorage } from '../utils/utils';
import Loader from '../components/Loader';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { clearLocalStorage } from '../utils/utils';


function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navegate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    const did = loadFromLocalStorage("did");

    const fetchData = async () => {
      try {
        const response =  await getProfileByDid(did);
        setProfileData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteAccount = () => {
    const did = loadFromLocalStorage("did");

    const fetchData = async () => {
      try {
        setLoading(true);
        await deleteProfile(did);
        clearLocalStorage();
        navegate('/');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Handle delete account logic here
    console.log("Account deleted");
  };

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4" gutterBottom>User Profile</Typography>
        {profileData && (
          <UserInfo
            firstName={profileData.name}
            lastName={profileData.last_name}
            email={profileData.email}
            documentId={profileData.document_id}
          />
        )}
      </Paper>
      {profileData && (
        <Button 
          style={{ marginTop: 10 }}
          variant="contained" color="secondary" onClick={handleOpen}>
          Delete Account
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your account?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserProfile;
