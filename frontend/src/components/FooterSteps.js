import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


export default function FooterSteps(props) {
  const {
    activeStep = 0,
    steps =  ['Step 1', 'Step 2', 'Step 3']
  } = props;
  
  return (
    <footer>
      <Stepper activeStep={activeStep} alternativeLabel sx={{mt: 10}}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </footer>
  );
}
