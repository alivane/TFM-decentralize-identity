import React, { useState } from 'react';
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

const CheckboxSelectorVC = ({ onChange, data }) => {
  const [selectedFields, setSelectedFields] = useState({});

  const handleChange = (fieldName) => (event) => {
    setSelectedFields({ ...selectedFields, [fieldName]: event.target.checked });
  };

  const handleApply = () => {
    onChange(selectedFields);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {Object.entries(data).map(([fieldName, fieldLabel]) => (
          <FormControlLabel
            key={fieldName}
            control={<Checkbox checked={selectedFields[fieldName] || false} onChange={handleChange(fieldName)} />}
            label={fieldLabel}
          />
        ))}
      </FormGroup>
      <Button onClick={handleApply} variant="contained" color="primary">Apply</Button>
    </FormControl>
  );
};

export default CheckboxSelectorVC;
