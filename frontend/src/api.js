import { Buffer } from 'buffer';
import { encryptData, decryptRSA } from "./utils/cryptoFunctions";
import forge from 'node-forge';
const API_BASE_URL = process.env.REACT_APP_ENDPOINT;

export const getFileContentFromIPFS = async (ipfsHash) => {
  try {
    // const response = await fetch(
    //   `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
    //     },
    //   }
    // );

    const response = await fetch(`http://localhost:3001/getFileContent?ipfsHash=${ipfsHash}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file content from IPFS: ${response.statusText}`);
    }

    return await response.text(); // Return the content as text
  } catch (error) {
    console.error("Error fetching file content from IPFS:", error);
    throw error;
  }
}


export const postFileIPFS = async (data) => {
  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
        body: data,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to pin file to IPFS: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error pinning file to IPFS:", error);
    throw error;
  }
}



export const generateRandomCode = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/generateRandomCode`);
    if (!response.ok) {
      throw new Error('Failed to fetch encrypted data');
    }
    const data = await response.json();

    return data.message;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const verifySignature = async (signup=false, fileContent, signature, publicKey) => {
  try {
    
    const body = {
      fileContent: fileContent, 
      signature: forge.util.encode64(signature), 
      publicKey: forge.util.encode64(publicKey) 
    };

    const bodyEncrypted = encryptData(process.env.REACT_APP_PUBLIC_KEY, body);

    const response = await fetch(`${API_BASE_URL}/verifySignature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...bodyEncrypted, signup: signup}),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message);
    }
    if (!response.ok) {
      throw new Error('Failed to fetch encrypted data');
    }
    console.log("result", result)
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const getPublicKeybyDid = async (did) => {
  try {
    
    const body = {
      did: did
    };

    const bodyEncrypted = encryptData(process.env.REACT_APP_PUBLIC_KEY, body);

    const response = await fetch(`${API_BASE_URL}/getPublicKeybyDid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...bodyEncrypted}),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message);
    }
    if (!response.ok) {
      throw new Error('Failed to fetch encrypted data');
    }
    console.log("result", result)
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
