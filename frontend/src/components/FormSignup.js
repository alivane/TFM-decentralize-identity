// SignupForm.js

import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Grid, 
  // Typography, 
  Box, 
  Tooltip 
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const SignupForm = ({
  onClickNext,
  formValues,
  setFormValues
}) => {
  // const [formValues, setFormValues] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   documentId: '',
  // });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = formValues.firstName ? "" : "First name is required";
    tempErrors.lastName = formValues.lastName ? "" : "Last name is required";
    tempErrors.documentId = formValues.documentId ? "" : "Document ID is required";
    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onClickNext(formValues);
      // // console.log('Form Submitted Successfully');
      // Handle form submission, e.g., send data to an API
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        {/* <Typography component="h1" variant="h5">
          Sign Up
        </Typography> */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                label="First Name"
                autoFocus
                value={formValues.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                required
                fullWidth
                label="Last Name"
                value={formValues.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                fullWidth
                label="Email Address"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="documentId"
                required
                fullWidth
                label="Document ID"
                value={formValues.documentId}
                onChange={handleChange}
                error={Boolean(errors.documentId)}
                helperText={errors.documentId}
                InputProps={{
                  endAdornment: (
                    <Tooltip title="e.g., Passport, Driver's License, National ID">
                      <InfoIcon color="action" />
                    </Tooltip>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
