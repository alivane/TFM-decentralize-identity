import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography,
  //  Button 
  } from '@mui/material';
import PropTypes from 'prop-types';
import OfferForm from '../components/OfferForm';
import GetCurrency from '../components/GetCurrency';
import ListCurrencies from '../components/ListCurrencies';
import { NAME_FIELDS_BUYER, NAME_FIELDS_SELLER } from "../utils/constants";
import ListCurrenciesData from "../components/ListCurrenciesData";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function HomeUser() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%', height: "80vh", }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="I want to offer currency" {...a11yProps(0)} />
          <Tab label="I want to get currency" {...a11yProps(1)} />
          <Tab label="My currencies" {...a11yProps(2)} />
          <Tab label="My connections" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OfferForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GetCurrency 
          data={data}
          setData={setData}
        />
        <ListCurrencies data={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ListCurrenciesData
          fieldsVC={NAME_FIELDS_SELLER}
          typeService="currencies"
          idVC="id_credential"
          title="Load My Currencies..."
        />
        {/* <Button 
          variant="contained" color="secondary" 
          fullWidth={true}
          onClick={() => triggerGetCurrencies()} style={{ marginTop: '20px' }}>
          Load My Currencies ...
        </Button>
        <CurrencyExchangeTable data={currencies} fieldsVC={NAME_FIELDS_SELLER} /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ListCurrenciesData
          fieldsVC={NAME_FIELDS_BUYER}
          typeService="contracts"
          idVC="id_credential_buyer"
          title="Load My Connections..."
        />
      </CustomTabPanel>
    </Box>
   
  );
}

export default HomeUser;
