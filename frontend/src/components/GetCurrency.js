import React, { useState } from 'react';
import { Button, OutlinedInput, Grid, MenuItem, Select, FormControl, InputLabel, Typography, Paper } from '@mui/material';
import { COUNTRIES_LIST, CURRENCY_BY_COUNTRY } from '../utils/constants';
import { searchByCountryAndSellValue } from '../api';

function GetCurrency(props) {
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  // const [selectedHaveCurrency, setSelectedHaveCurrency] = useState([]);
  const [countryInputs, setCountryInputs] = useState({});
  // const [currencyInputs, setCurrencyInputs] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');

  const {
    // data, 
    setData
  } = props;

  const handleCountryChange = (event) => {
    const selected = event.target.value;
    setSelectedCountry(selected);
    setCountryInputs({
      ...countryInputs,
      [selected]: '',
    });
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setCountryInputs({
  //     ...countryInputs,
  //     [name]: value,
  //   });
  // };

  // const handleInputChangeCurrency = (event) => {
  //   const { name, value } = event.target;
  //   setCurrencyInputs({
  //     ...currencyInputs,
  //     [name]: value,
  //   });
  // };

  const handleCurrencySelect = (event) => {
    setSelectedCurrency(event.target.value);
  };

  // const handleHaveCurrencySelect = (event) => {
  //   setSelectedHaveCurrency(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // // console.log('Selected button:', selectedButton);
    // console.log('Selected countries:', selectedCurrency);
    // console.log('Country inputs:', countryInputs);
    // console.log('Selected country:', selectedCountry);
    // console.log("country", selectedCountry);
    // console.log(selectedCountry,
      // selectedCurrency)

    async function fetchData() {
      try {
        const result = await searchByCountryAndSellValue(
          {
            country: selectedCountry,
            currencies: selectedCurrency
          }
        );
        setData(result.data)
        // console.log(result, "=resultresult")
      } catch (error) {
      } finally {
      }
    }
    fetchData();
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        I WANT GET CURRENCY
      </Typography>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Country where I want to change ...
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
            {COUNTRIES_LIST.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
              I want currencies from ...
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="multiple-select-placeholder-label">Currency...</InputLabel>
            <Select
              labelId="multiple-select-placeholder-label"
              multiple
              value={selectedCurrency}
              onChange={handleCurrencySelect}
              input={<OutlinedInput label="Currency..." />}
              fullWidth
            >
              {CURRENCY_BY_COUNTRY.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
              I have currencies from ...
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="multiple-select-placeholder-label">Currency...</InputLabel>
            <Select
              labelId="multiple-select-placeholder-label"
              multiple
              value={selectedHaveCurrency}
              onChange={handleHaveCurrencySelect}
              input={<OutlinedInput label="Currency..." />}
              fullWidth
            >
              {CURRENCY_BY_COUNTRY.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        
        {/* <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            I want to get currency of ...
          </Typography>
          {selectedCurrency.map((country) => (
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
        </Grid> */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
            Get
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default GetCurrency;
