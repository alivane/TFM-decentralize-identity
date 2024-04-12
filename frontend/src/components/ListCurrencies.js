import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

function RandomTable() {
  // Function to generate random data
  const generateRandomData = () => {
    const currencies = ['USD', 'EUR', 'GBP', 'JPY'];
    const data = [];

    for (let i = 0; i < 10; i++) {
      const money = Math.floor(Math.random() * 1000) + 1; // Random amount between 1 and 1000
      const currency = currencies[Math.floor(Math.random() * currencies.length)]; // Random currency from the array
      const commission = `${Math.floor(Math.random() * 1000) + 1} ${currencies[Math.floor(Math.random() * currencies.length)]}`; // Random commission between 0 and 0.5

      data.push({ money, currency, commission });
    }

    return data;
  };

  const randomData = generateRandomData();

  const handleButtonClick = (rowData) => {
    // Implement your logic when a button in a row is clicked
    console.log("Button clicked for:", rowData);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Money</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Connect</TableCell> {/* New table cell for the button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {randomData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.money}</TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell>{row.commission}</TableCell>
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
