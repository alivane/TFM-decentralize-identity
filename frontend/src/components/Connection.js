// CredentialDialog.js
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Typography
} from '@mui/material';
import { containsKeywords, 
  // loadFromLocalStorage
 } from "../utils/utils";
import LocationSelector from './LocationSelector';
import { COUNTRIES_LIST_LOCATION, SINGLE_CHALLENGE_STEPS } from "../utils/constants";
import ProcessChallenge from "../components/ProcessChallengeSimple";
import FooterSteps from "../components/FooterSteps";
// import SuccessComponent from './SuccessComponent';
import TimeSelector from "../components/TimeSelector";


const CredentialDialog = ({ open, onClose, data, setSuccessResponse }) => {
  // const [locationInit, setLocationInit] = useState(COUNTRIES_LIST_LOCATION[data.country_of_exchange]);
  const locationInit = COUNTRIES_LIST_LOCATION[data.country_of_exchange];
  const [contractDetails, setContractDetails] = useState(`The key word is: ${containsKeywords()} \n I will wait you in ...`);
  const [location, setLocation] = useState(null);

  const [register, setRegister] = useState(false);
  const [extraData, setExtraData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  // const [errorResponse, setErrorResponse] = useState(false);
  // const [successResponse, setSuccessResponse] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);


  const handleMakeContract = () => {
    // Logic to create a contract based on the credential and contractDetails
    // const did = loadFromLocalStorage("did");
    const contractData = {
      did_seller: data.did_subject,
      id_credential_seller: data.id_credential,
      message_to_seller: contractDetails,
      currency_sell: data.currency_sell,
      currency_sell_value: data.currency_sell_value,
      currency_cost_value: data.currency_cost_value,
      currency_cost: data.currency_cost,
      country_of_exchange: data.country_of_exchange,
      location: location,
      time: selectedTime
    };

    if (!location || !selectedTime) {
      alert("Please fill in the required fields.")
    } else {
      // console.log(contractData, "=contractData")
      setExtraData(contractData);
      setRegister(true)
    }
  };

 
  useEffect(() => {
    if (activeStep === 2) {
      // return () => {
        // console.log("Good!")
        setSuccessResponse("Contract was created!")
        setRegister(false);
        setActiveStep(0);
        setExtraData(null);
        onClose();
      // }
    }
  }, [activeStep, setSuccessResponse, onClose])

  
  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    // Additional actions can be performed here
    // console.log("Selected Location:", selectedLocation, location);
  };
  return (
    <Dialog open={open} onClose={onClose} xs={{width: "100%"}}>
      
      <DialogTitle>Do you want to make a contract?</DialogTitle>
      {
        register ? (
        <DialogContent>
          <Typography gutterBottom style={{ textAlign: 'center' }}>
            Please complete this step to make the contract... {activeStep}
          <Button onClick={() => setRegister(false)}>Go Back</Button>
          </Typography>
          <ProcessChallenge
            steps={SINGLE_CHALLENGE_STEPS}
            setActiveStep={setActiveStep}
            extraData={extraData}
            typeApi="contract"
          />
          <FooterSteps
            activeStep={activeStep}
            steps={SINGLE_CHALLENGE_STEPS}
          />
        </DialogContent>
        ) : (
        <DialogContent>
          <Grid container spacing={2}>
           <Grid item xs={12}>
            <Typography variant="subtitle1">Buy: {data.currency_sell_value} {data.currency_sell}</Typography>
            <Typography variant="subtitle1">Cost: {data.currency_cost_value} {data.currency_cost}</Typography>
            <Typography variant="subtitle1">Country of Exchange: {data.country_of_exchange}</Typography>
            <Typography variant="subtitle1">Type: In person</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Message to the seller"
              fullWidth
              multiline
              rows={4}
              value={contractDetails}
              onChange={(e) => setContractDetails(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TimeSelector onSelectTime={setSelectedTime} />
          </Grid>
          <Grid item xs={12}>
            <LocationSelector
              onSelectLocation={handleSelectLocation}
              locationInit={locationInit}
              location={location}
            />
          </Grid>
        </Grid>
      </DialogContent>
        )
      }

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button 
          disabled={!location || !selectedTime}
          onClick={handleMakeContract} color="primary" variant="contained">
          Make Connection
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CredentialDialog;
