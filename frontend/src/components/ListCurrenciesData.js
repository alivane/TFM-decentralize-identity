import React, { useState } from 'react';
import { Box, 
  // Tabs, Tab, Typography, 
  Button } from '@mui/material';
// import { COUNTRIES_LIST, CURRENCY_BY_COUNTRY, NAME_FIELDS_SELLER, SINGLE_CHALLENGE_STEPS } from "../utils/constants";
import { getListDataByDid } from '../api';
import { loadFromLocalStorage } from '../utils/utils';
import CurrencyExchangeTable from "./CurrencyExchangeTable";
import ErrorComponent from "./ErrorComponent";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import Loader from './Loader';

function ListCurrenciesData(props) {
  const {
    fieldsVC,
    typeService,
    idVC,
    title
  } = props;
  const [currencies, setCurrencies] = useState([]);
  const [errorResponse, setErrorResponse] = useState(false);
  const [loading, setLoading] = useState(false);


    const triggerGetCurrencies = async () => {
      setLoading(true);
      try {
        const did = loadFromLocalStorage("did");
        const result = await getListDataByDid({
          did: did,
          type: typeService
        });
        // console.log(result.data, "=============result.data.publicKey[0]")
        setCurrencies(result.data);
      } catch (error) {
        // console.log(error.toString(), "=============result.data.publicKey[0]")
        setErrorResponse(error.toString());
      } finally {
        setLoading(false)
      }
    }
  

  return (
    <Box sx={{ width: '100%' }}>
      {
        errorResponse && (
          <ErrorComponent errorMessage={errorResponse} onClose={() => setErrorResponse(null)}/>
        )
      }
      
      <Button 
          variant="contained" color="secondary" 
          fullWidth={true}
          onClick={() => triggerGetCurrencies()} style={{ marginTop: '20px' }}>
          {title}
          <BrowserUpdatedIcon />
        </Button>
        <CurrencyExchangeTable
          data={currencies}
          fieldsVC={fieldsVC}
          idVC={idVC}
        />
        {
        loading && (
          <Loader />
        )
      }
    </Box>
   
  );
}

export default ListCurrenciesData;
