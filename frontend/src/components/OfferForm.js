import React, { useState } from 'react';
import { Button, OutlinedInput, InputAdornment, Grid, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Paper } from '@mui/material';

function OfferForm() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countryInputs, setCountryInputs] = useState({});
  const [countryInputsReceive, setCountryInputsReceive] = useState({});
  const [currencyInputs, setCurrencyInputs] = useState({});
  const [currencyInputsReceive, setCurrencyInputsReceive] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (event) => {
    const selected = event.target.value;
    setSelectedCountry(selected);
    setCountryInputs({
      ...countryInputs,
      [selected]: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCountryInputs({
      ...countryInputs,
      [name]: value,
    });
  };

  const handleInputChangeReceive = (event) => {
    const { name, value } = event.target;
    setCountryInputsReceive({
      ...countryInputsReceive,
      [name]: value,
    });
  };


  const handleInputChangeCurrencyReceive = (event) => {
    const { name, value } = event.target;
    setCurrencyInputsReceive({
      ...currencyInputsReceive,
      [name]: value,
    });
  };

  const handleInputChangeCurrency = (event) => {
    const { name, value } = event.target;
    setCurrencyInputs({
      ...currencyInputs,
      [name]: value,
    });
  };

  const handleCountrySelect = (event) => {
    setSelectedCountries(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Selected button:', selectedButton);
    console.log('Selected countries:', selectedCountries);
    console.log('Country inputs:', countryInputs);
    console.log('Selected country:', selectedCountry);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        I WANT TO OFFER CURRENCY
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            I want to register ...
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="multiple-select-placeholder-label">Countries...</InputLabel>
            <Select
              labelId="multiple-select-placeholder-label"
              multiple
              value={selectedCountries}
              onChange={handleCountrySelect}
              input={<OutlinedInput label="Countries..." />}
              fullWidth
            >
              {['USA', 'UK', 'FR', 'DE', 'IT'].map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          {
            selectedCountries.length > 0 && (
              <Typography variant="h6" gutterBottom>
                I want to offer...
              </Typography>
            )
          }
          {selectedCountries.map((country) => (
            <Grid container spacing={2}>
              <Grid item xs={6} key={country}>
                <TextField
                  fullWidth
                  label={`Currency for ${country}`}
                  name={country}
                  value={countryInputs[country] || ''}
                  onChange={handleInputChange}
                  type="number"
                  required
                  style={{ marginTop: '10px' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{currencyInputs[country]}</InputAdornment>,
                    inputProps: {
                      step: '0.001',
                      min: '0',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} key={country}>
                <FormControl fullWidth style={{ marginTop: '10px' }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    name={country}
                    value={currencyInputs[country] || ''}
                    input={<OutlinedInput label="Currency" />}
                    onChange={handleInputChangeCurrency}
                  >
                    {['USD', 'GBP', 'EUR', 'JPY', 'CAD'].map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={6}>
          {
            selectedCountries.length > 0 && (
              <Typography variant="h6" gutterBottom>
                I want to receive...
              </Typography>
            )
          }
          {selectedCountries.map((country) => (
            <Grid container spacing={2}>
              <Grid item xs={6} key={country}>
                <TextField
                  fullWidth
                  label={`Currency for ${country}`}
                  name={country}
                  value={countryInputsReceive[country] || ''}
                  onChange={handleInputChangeReceive}
                  type="number"
                  required
                  style={{ marginTop: '10px' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{currencyInputsReceive[country]}</InputAdornment>,
                    inputProps: {
                      step: '0.001',
                      min: '0',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} key={country}>
                <FormControl fullWidth style={{ marginTop: '10px' }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    name={country}
                    value={currencyInputsReceive[country] || ''}
                    input={<OutlinedInput label="Currency" />}
                    onChange={handleInputChangeCurrencyReceive}
                  >
                    {['USD', 'GBP', 'EUR', 'JPY', 'CAD'].map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Country where I want to offer...
          </Typography>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <InputLabel id="select-placeholder-label">Where?</InputLabel>
            <Select
              labelId="select-placeholder-label"
              value={selectedCountry}
              onChange={handleCountryChange}
              input={<OutlinedInput label="Where?" />}
              fullWidth
            >
              {['JP', 'CN', 'IN', 'AU'].map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OfferForm;
