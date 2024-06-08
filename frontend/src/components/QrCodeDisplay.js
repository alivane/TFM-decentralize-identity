import React, {
  //  useEffect, 
   useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Typography } from '@mui/material';
import { encode64 } from '../utils/cryptoFunctions';
// import { 
  // encryptDataReduce,
  //  getCredential } from '../api';
import Loader from './Loader';
import ErrorComponent from "../components/ErrorComponent";
import CheckboxSelectorVC from './CheckboxSelectorVC';
import { loadFromLocalStorage } from '../utils/utils';
// import pako from 'pako';
// import ReaderQr from "./ReaderQR";



const QRCodeDisplay = ({ open, onClose, data, fieldsVC, idVC }) => {
  // useEffect(() => {
  //   // console.log(JSON.stringify({data: encode64(JSON.stringify(data))}))

  //   // console.log(data, "=data")
    
  // }, [])
  const [generateQr, setGenerateQr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState(null);
  const [fields, setFields] = useState(null);

  // const splitString = (str, size) => {
  //   const numChunks = Math.ceil(str.length / size);
  //   const chunks = new Array(numChunks);
  //   for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
  //     chunks[i] = str.substr(o, size);
  //   }
  //   return chunks;
  // };

  const onGenerateQr = () => {
    // console.log(data, "=data=====================", data[idVC])
    if ( data ) {
      setLoading(true);
      const id_credential = data[idVC];
  
      const credential = {
        credential_id: id_credential,
        share: fields,
        did: loadFromLocalStorage("did")
      }

      // console.log(credential, "=credential")
      
      // console.log(data, "=data")
      const url = `${window.location.origin}/verify-credentials/${encode64(JSON.stringify(credential))}`
  
      // console.log(url, "=url")
      setGenerateQr(url);
      setLoading(false);
    }
  }

  const onChangeSelectors = (value) => {
    const result = Object.keys(value).filter((fieldName) => value[fieldName]);
    setFields(result);

  }

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>QR Code</DialogTitle>
      <DialogContent>
        {/* <ReaderQr /> */}
        {/* <Typography variant="body1">Data:</Typography>
        <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(data, null, 2)}
        </Typography> */}
        {
          errorResponse && (
            <ErrorComponent errorMessage={errorResponse} open={true} onClose={() => setErrorResponse(null)}/>
          )
        }
        {
          loading && (
            <Loader />
          )
        }

        {
          !fields && (
            <div>
              <Typography color={"secondary"}>Please Select the fields to show</Typography>
              <CheckboxSelectorVC 
                onChange={onChangeSelectors}
                data={fieldsVC}
              />
            </div>
          )
        }

        {
          (fields && !generateQr) && 
            <Button onClick={onGenerateQr} color="secondary" disabled={loading} >
                Generate QR <QrCodeIcon />
            </Button>
        }
        {
          generateQr && (
            <div>
              <QRCode value={generateQr} ecl="L"/>
              {/* <Link to={`/verify-credentials/${generateQr}`} target="_blank"> */}
              <Link to={`${generateQr}`} target="_blank">
                <Typography variant="body2">
                  go to verify
                </Typography>
              </Link>
            </div>
          )
        }
      </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default QRCodeDisplay;
