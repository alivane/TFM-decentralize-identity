import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import QrCode from '@mui/icons-material/QrCode';
// import Connection from "./Connection";
// import SuccessComponent from './SuccessComponent';
import QRCodeDisplay from './QrCodeDisplay';

function CurrencyExchangeTable(props) {
  const { data, fieldsVC, idVC } = props;
  const [info, setInfo] = useState(null);

  const handleButtonClick = (rowData) => {
    // Implement your logic when a button in a row is clicked
    // console.log("Button clicked for:", rowData);
    setInfo(rowData);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      {
        info && (
          <QRCodeDisplay
            open={true}
            onClose={() => setInfo(null)} 
            data={info} 
            fieldsVC={fieldsVC}
            idVC={idVC}
          />
        )
      }
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency Value</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Cost Value</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Show QR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.currency_sell_value}</TableCell>
                  <TableCell>{row.currency_sell}</TableCell>
                  <TableCell>{row.currency_cost_value}</TableCell>
                  <TableCell>{row.currency_cost}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleButtonClick(row)}
                      startIcon={<QrCode />}
                    >
                      Show QR
                    </Button>
                  </TableCell>
                </TableRow>
                
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CurrencyExchangeTable;
