import dotenv from "dotenv";
import express, { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import { 
  // validateTimestamp, verifySignature, 
  doubleDecrypt, encryptData, 
  // decryptData, 
  generateCode, decode64 } from "./encrypted.js";
// import { generateDidDocument } from "./did.js";
// import { PinataClient } from "./pinata-api.js";
// import DataService from "./database/users.js";
import { 
  createDidUser, 
  validatePublicKeyExist, 
  signatureVerification,
  signatureVerificationByDid,
  getPublicKeyByDid,
  getDidByPublicKey,
  createCurrencyExchange,
  searchByCountryAndSellValue,
  getCurrenciesByDid,
  createContractCurrency,
  getProfileByDid,
  getContractsByDID
 } from "./verification.js"
import createCredentials from "./create-credential.js";
import getVerifyCredential from "./get-verify-credential.js";
import checkVerifyCredential from "./check-verify-credential.js";
import { getSpecificFields, reconstructData } from "./utils.js";

// Load environment variables from .env file
dotenv.config();
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
const port = process.env.PORT || 3001; // Use 3001 as default port if PORT is not defined

const APP_PRIVATE_KEY = process.env.APP_PRIVATE_KEY || "";
const APP_PUBLIC_KEY = process.env.APP_PUBLIC_KEY || "";
// const PINATA_KEY = process.env.PINATA_KEY || "";
// const PINATA_SECRET = process.env.PINATA_SECRET || "";


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
    //console.log(signature, "=signature")
    return res.status(signature[0] as number).json(signature[1]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Endpoint to verify signature and decrypt data
app.post('/verifySignatureByDid', async (req: Request, res: Response) => {
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
    
    const signature = await signatureVerificationByDid(message_decrypted);

    if (signature[0] != 200) {
      return res.status(signature[0] as number).json(signature[1]);
    }

    //console.log(signature, "===========signature")
    //console.log(decode64(message_decrypted.data), "=data this is");

    if (message_decrypted.type === "offer") {
      let offerCreated = false;
      const data = JSON.parse(decode64(message_decrypted.data));
      for(let index in data)
      { 
          //console.log(data[index]);
          //console.log(index, "============")
          const idCredential = await createCredentials({
            id: decode64(message_decrypted.did),
            ...data[index]
          })
          //console.log("hheere", idCredential)
          const createCurrencyExchangeResult = await createCurrencyExchange(
            {
              id_credential: idCredential,
              did_subject: decode64(message_decrypted.did),
              ...data[index]
            }
          );

          //console.log(createCurrencyExchangeResult, "====createCurrencyExchangeResult")

          offerCreated = createCurrencyExchangeResult[0] === 200;

          if (!offerCreated) {
            return res.status(400).json({ success: false, message: 'Error creating currencies' });
          }
          
      }
      
      // createCredentials(message_decrypted.data)
      // return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (message_decrypted.type == "contract") {
      let created = false;
      //console.log("is a conract")
      //console.log(message_decrypted.data, "===========message_decrypted.data")
      const data = JSON.parse(decode64(message_decrypted.data));
      // //console.log({
      //   did_buyer: decode64(message_decrypted.did),
      //   ...data
      // });
      const idCredential = await createCredentials({
        did_buyer: decode64(message_decrypted.did),
        ...data
      })
      //console.log("hheere", idCredential)
      const create = await createContractCurrency(
        {
          id_credential_buyer: idCredential,
          did_buyer: decode64(message_decrypted.did),
          ...data
        }
      );

      //console.log(create, "====createCurrencyExchangeResult")

      created = create[0] === 200;

      if (!created) {
        return res.status(400).json({ success: false, message: 'Error creating currencies' });
      }

    }

    
    // //console.log(signature, "=signature")
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
    //console.log(content); 
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

// Endpoint to getDidByPublicKey and decrypt data
app.post('/getDidByPublicKey', async (req: Request, res: Response) => {
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
    const result = await getDidByPublicKey(message_decrypted);

    return res.status(result[0] as number).json(result[1]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/getProfileByDid', async (req: Request, res: Response) => {
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
    const result = await getProfileByDid(message_decrypted);

    return res.status(result[0] as number).json(result[1]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Endpoint to verify signature and decrypt data
app.post('/searchByCountryAndSellValue', async (req: Request, res: Response) => {
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

    // if (signup) {
    //   const result = await validatePublicKeyExist(message_decrypted);

    //   if (result[0] != 200) return res.status(result[0] as number).json(result[1]);
    // }
    //console.log(message_decrypted, "=message_decrypted")
    const all_data = await searchByCountryAndSellValue(message_decrypted);

    // if (signature[0] != 200) {
    //   return res.status(signature[0] as number).json(signature[1]);
    // }

    
    //console.log(all_data, "=all_data====")
    return res.status(all_data[0] as number).json(all_data[1]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to getPublicKeybyDid and decrypt data
app.post('/getListDataByDid', async (req: Request, res: Response) => {
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

    const typeService = message_decrypted.type;

    let result: any = [];

    if (typeService === "currencies") {
      result = await getCurrenciesByDid(message_decrypted);
    }

    if (typeService === "contracts") {
      result = await getContractsByDID(message_decrypted);
      //console.log("contractas", result)
      
    }

    return res.status(result[0] as number).json(result[1]);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Endpoint to getPublicKeybyDid and decrypt data
app.post('/getCredential', async (req: Request, res: Response) => {
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

    //console.log("Loading....")
    const hashCredential = message_decrypted.hash;
    const credentialData = await getVerifyCredential(hashCredential);

    
    //console.log("====================================")
    //console.log(credentialData, "=credentialData")

    //console.log("====================================")

    return res.status(200).json({
      success: true,
      data: credentialData
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// //console.log(message_decrypted, "decomprise==")
// const decomprise = reconstructData(message_decrypted.hash);
// //console.log(decomprise, "decomprise==")

// Endpoint to getPublicKeybyDid and decrypt data
app.post('/getValidationVerifiableCredential', async (req: Request, res: Response) => {
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

    //console.log("Loading....", message_decrypted.hash)
    const data_credential = JSON.parse(decode64(message_decrypted.hash));
    
    //console.log(data_credential, "=hashCredential")

    const check = await checkVerifyCredential(data_credential.credential);

    if (!check) {
      //console.log("was not checked")
    }
    // console.log(data_credential.share, data_credential.credential.credentialSubject, "=")
    const result = getSpecificFields(
      data_credential.share,
      data_credential.credential.credentialSubject
    )

    //console.log(check, "==========check", result)
    // const credentialData = await getVerifyCredential(hashCredential);

    
    // //console.log("====================================")
    // //console.log(credentialData, "=credentialData")

    // //console.log("====================================")

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



// https://www.youtube.com/watch?v=U6va97LOZ0M


// yarn ts-node --esm ./src/list-credentials.ts




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// yarn ts-node --esm ./src/server.ts