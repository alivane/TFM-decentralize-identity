import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());
const REACT_APP_PINATA_JWT = process.env.REACT_APP_PINATA_JWT


app.get('/getFileContent', async (req: Request, res: Response) => {
  try {
    const ipfsHash = req.query.ipfsHash as string; // Assuming the IPFS hash is passed as a query parameter
    const pinataJwt = REACT_APP_PINATA_JWT as string; // Replace with your Pinata JWT
    const pinataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    const response = await fetch(pinataUrl, {
      headers: {
        Authorization: `Bearer ${pinataJwt}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch file content from IPFS: ${response.statusText}`);
    }

    const content = await response.text(); // Get the content as text
    console.log(content); 
    res.send(content); // Send the content back to the client
  } catch (error) {
    console.error('Error fetching file content from IPFS:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
