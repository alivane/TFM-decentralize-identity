import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, makeStyles, Typography } from '@material-ui/core';
import { decode64 } from '../utils/cryptoFunctions';
import { updateUserInfo } from '../api';
import Loader from './Loader';
import { loadFromLocalStorage } from '../utils/utils';

const useStyles = makeStyles(() => ({
  container: {
    padding: '20px',
    marginTop: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginTop: '20px',
  },
}));

function EditUser() {
  const { field } = useParams();
  const classes = useStyles();
  const [data, setData] = useState(JSON.parse(decode64(field)).value);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();

  const handleSave = () => {
    // Save the updated field value to your backend or state
    // console.log(`Saved ${.key}`);
    const params = JSON.parse(decode64(field));

    const did = loadFromLocalStorage("did");

    const body = {
        did: did,
        field: params.key,
        value: data
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        await updateUserInfo(body);
        navegate('/profile');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  if (error) {
    return <Typography>Error: {error}</Typography>
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <TextField
        fullWidth
        label={`Edit ${JSON.parse(decode64(field)).name}`}
        variant="outlined"
        margin="normal"
        // Set the default value and handle changes here
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
      <Button variant="contained" color="primary" onClick={handleSave} className={classes.button}>
        Save
      </Button>
    </Container>
  );
}

export default EditUser;
