import React, { useEffect, useState } from 'react';
import { Button, OutlinedInput, 
  // InputAdornment, 
  Grid, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Paper } from '@mui/material';
import { COUNTRIES_LIST, CURRENCY_BY_COUNTRY, SINGLE_CHALLENGE_STEPS } from "../utils/constants";
import ProcessChallenge from "../components/ProcessChallengeSimple";
import FooterSteps from "../components/FooterSteps";
import SuccessComponent from './SuccessComponent';
import ErrorComponent from "./ErrorComponent";
import AlarmMessage from "../components/AlarmMessage";



function OfferForm() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countryInputs, setCountryInputs] = useState({});
  const [countryInputsReceive, setCountryInputsReceive] = useState({});
  // const [currencyInputs, setCurrencyInputs] = useState({});
  const [currencyInputsReceive, setCurrencyInputsReceive] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');
  const [register, setRegister] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [extraData, setExtraData] = useState({});
  const [errorResponse, setErrorResponse] = useState(false);
  const [successResponse, setSuccessResponse] = useState(false);
  const [alarm, setAlarm] = useState(null);

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


  const handleCountrySelect = (event) => {
    setSelectedCountries(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // // console.log('Selected button:', selectedButton);
    const data = selectedCountries.map((value, _) => {
      return {
        // index,
        currency_sell: value || "",
        currency_sell_value: countryInputs[value] || "",
        currency_cost_value: countryInputsReceive[value] || "",
        currency_cost: currencyInputsReceive[value] || "",
        country_of_exchange: selectedCountry || ""
      };
    });

    let validated = true;
    data.forEach(element => {
      if (
        element.currency_sell.length === 0 || 
        element.currency_sell_value.length === 0 ||
        element.currency_cost_value.length === 0 ||
        element.currency_cost.length === 0 ||
        element.country_of_exchange.length === 0
      ) {
        validated = false;
        setAlarm("All fields must be completed.")
        return false;
      }
    });
    if (validated) {
      setExtraData(data);
      setRegister(true);
    }
  };

  useEffect(() => {
    if (activeStep === 2) {
      // console.log("Good!")
      setSuccessResponse("Currencies are registrated!")

      // Reset
      setSelectedCountries([]);
      setCountryInputs({});
      setCountryInputsReceive({});
      setCurrencyInputsReceive({});
      setSelectedCountry('');
      setRegister(false);
      setActiveStep(0);
      setExtraData({});
      setErrorResponse(false);

      
    }
  }, [activeStep])

  

  return (
    <div>
      {
        alarm && (
          <AlarmMessage open={true} message={alarm} onClose={() => setAlarm(null)}/>
        )
      }
      {
        errorResponse && (
          <ErrorComponent errorMessage={errorResponse} onClose={() => setErrorResponse(null)}/>
        )
      }
      {
        successResponse && (
          <SuccessComponent successMessage={successResponse} onClose={() => setSuccessResponse(false)} />
        )
      }
      {
        register ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom style={{ textAlign: 'center' }}>
                Step... {activeStep}
              <Button onClick={() => setRegister(false)}>Go Back</Button>
              </Typography>
              <ProcessChallenge
                steps={SINGLE_CHALLENGE_STEPS}
                setActiveStep={setActiveStep}
                extraData={extraData}
              />
              <FooterSteps
                activeStep={activeStep}
                steps={SINGLE_CHALLENGE_STEPS}
              />
            </Grid>
          </Grid>
        ) : (

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
                    {CURRENCY_BY_COUNTRY.map((country) => (
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
                    <Grid item xs={12} key={country}>
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
                          // startAdornment: <InputAdornment position="start">{currencyInputs[country]}</InputAdornment>,
                          inputProps: {
                            step: '0.001',
                            min: '0',
                          },
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={6} key={country}>
                      <FormControl fullWidth style={{ marginTop: '10px' }}>
                        <InputLabel>Currency</InputLabel>
                        <Select
                          name={country}
                          value={currencyInputs[country] || ''}
                          input={<OutlinedInput label="Currency" />}
                          onChange={handleInputChangeCurrency}
                        >
                          {CURRENCY_BY_COUNTRY.map((currency) => (
                            <MenuItem key={currency} value={currency}>
                              {currency}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
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
                        label={`Cost for ${country}`}
                        name={country}
                        value={countryInputsReceive[country] || ''}
                        onChange={handleInputChangeReceive}
                        type="number"
                        required
                        style={{ marginTop: '10px' }}
                        // InputProps={{
                        //   startAdornment: <InputAdornment position="start">{currencyInputsReceive[country]}</InputAdornment>,
                        //   inputProps: {
                        //     step: '0.001',
                        //     min: '0',
                        //   },
                        // }}
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
                          {CURRENCY_BY_COUNTRY.map((currency) => (
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
                    {COUNTRIES_LIST.map((country) => (
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
        )
      }
    </div>
  );
}

export default OfferForm;
