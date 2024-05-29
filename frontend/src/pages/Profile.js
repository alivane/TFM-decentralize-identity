import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@material-ui/core';
import UserInfo from '../components/UserInfo'; // Assuming you have already created the UserInfo component
import { getProfileByDid } from '../api';
import { loadFromLocalStorage } from '../utils/utils';
import Loader from '../components/Loader';

function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    </Container>
  );
}

export default UserProfile;
