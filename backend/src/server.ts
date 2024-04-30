import dotenv from "dotenv";
import express, { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import { validateTimestamp, verifySignature, doubleDecrypt, encryptData, decryptData, generateCode } from "./encrypted.js";
import { generateDidDocument } from "./did.js";
import { PinataClient } from "./pinata-api.js";
import DataService from "./database/users.js";
import { 
  createDidUser, 
  validatePublicKeyExist, 
  signatureVerification,
  getPublicKeyByDid
 } from "./verification.js"

// Load environment variables from .env file
dotenv.config();
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const port = process.env.PORT || 3001; // Use 3001 as default port if PORT is not defined

const APP_PRIVATE_KEY = process.env.APP_PRIVATE_KEY || "";
const APP_PUBLIC_KEY = process.env.APP_PUBLIC_KEY || "";
const PINATA_KEY = process.env.PINATA_KEY || "";
const PINATA_SECRET = process.env.PINATA_SECRET || "";


// Enable CORS for all routes
app.use(cors());


app.get('/generateRandomCode', (req: Request, res: Response) => {
  try {
    // Generate random code and timestamp
    const code = generateCode();
    // Add encrypted data to the response
    const responseData = encryptData(APP_PUBLIC_KEY, code);
    // Send the response back to the client
    res.status(201).json({ success: true, message: responseData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Endpoint to verify signature and decrypt data
app.post('/verifySignature', async (req: Request, res: Response) => {
  try {
    // // Get encryptedSymmetricKey and encryptedData from req.body
    const { signup, key, data, iv } = req.body;
    // Check if encryptedSymmetricKey and encryptedData are present
    if (!key || !iv || !data) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
    }

    const message_decrypted = doubleDecrypt({ 
      privateKey: APP_PRIVATE_KEY, 
      encryptedSymmetricKey: key, 
      encryptedData: data, 
      encryptedIV: iv 
    })

    if (signup) {
      const result = await validatePublicKeyExist(message_decrypted);

      if (result[0] != 200) return res.status(result[0] as number).json(result[1]);
    }
    
    const signature = signatureVerification(message_decrypted);

    if (signature[0] != 200) {
      return res.status(signature[0] as number).json(signature[1]);
    }

    if (signup) {
      const result = await createDidUser(message_decrypted);
      
      return res.status(result[0] as number).json(result[1]);
    }

    return res.status(signature[0] as number).json(signature[1]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



app.get('/getFileContent', async (req: Request, res: Response) => {
  try {
    const ipfsHash = req.query.ipfsHash as string; // Assuming the IPFS hash is passed as a query parameter
    const pinataJwt = process.env.REACT_APP_PINATA_JWT as string; // Replace with your Pinata JWT
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

// Endpoint to getPublicKeybyDid and decrypt data
app.post('/getPublicKeybyDid', async (req: Request, res: Response) => {
  try {
    // // Get encryptedSymmetricKey and encryptedData from req.body
    const { key, data, iv } = req.body;
    // Check if encryptedSymmetricKey and encryptedData are present
    if (!key || !iv || !data) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
    }

    const message_decrypted = doubleDecrypt({ 
      privateKey: APP_PRIVATE_KEY, 
      encryptedSymmetricKey: key, 
      encryptedData: data, 
      encryptedIV: iv 
    })
    const result = await getPublicKeyByDid(message_decrypted);

    return res.status(result[0] as number).json(result[1]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// yarn ts-node --esm ./src/server.ts