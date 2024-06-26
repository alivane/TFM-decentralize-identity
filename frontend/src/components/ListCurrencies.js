import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Connection from "./Connection";
import SuccessComponent from './SuccessComponent';

function RandomTable(props) {
  const { data } = props;
  const [info, setInfo] = useState(null);
  const [successResponse, setSuccessResponse] = useState(false);

  const handleButtonClick = (rowData) => {
    // Implement your logic when a button in a row is clicked
    // console.log("Button clicked for:", rowData);
    setInfo(rowData);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      {
        successResponse && (
          <SuccessComponent successMessage={successResponse} onClose={() => setSuccessResponse(false)} />
        )
      }
      {
        info && (
          <Connection 
            data={info}
            open={true}
            onClose={() => setInfo(null)}
            setSuccessResponse={setSuccessResponse}  
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
              <TableCell>Connect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
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
                      startIcon={<ConnectWithoutContactIcon />}
                    >
                      Connect
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

export default RandomTable;
