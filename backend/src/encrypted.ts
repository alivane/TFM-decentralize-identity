import crypto from 'crypto';
import forge from 'node-forge';

// Function to generate a random code
// const generateRandomCode = () => {
//   return Math.random().toString(36).substring(2, 10);
// };
const generateRandomCode = (length=20) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};


// Function to get the current timestamp
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

const getFormatTimestamp = (timestamp: string) => {
  const format_timestamp = new Date(timestamp);

  return format_timestamp;
}


const isValidTimestamp = (timestamp: Date, threshold: number) => {
  // Get the current time
  const currentTime = Date.now();

  // Calculate the elapsed time since the timestamp was recorded
  const elapsedTime = currentTime - timestamp.getTime();
  // //console.log(currentTime, timestamp.getTime(), threshold > elapsedTime)

  return elapsedTime < threshold;
}


export const validateTimestamp = (data: string) => {
  // const data = forge.util.decode64(data64);

  const format_data = JSON.parse(data);

  const timestamp = getFormatTimestamp(format_data.timestamp);

  // Define the threshold for 1 hour in milliseconds
  const isValid = isValidTimestamp(timestamp, 3600000)
  return isValid;
}

export const generateCode = () => {
  // Generate random code and timestamp
  const randomCode = generateRandomCode();
  const timestamp = getCurrentTimestamp();

  const data = {
    randomCode: randomCode,
    timestamp: timestamp,
  };

  return JSON.stringify(data);
}



// Function to verify a digital signature for file content using public key
export const verifySignature = (content: string, signature64: string, publicKey64: string) => {
    // const content = forge.util.decode64(content64);
    const signature = forge.util.decode64(signature64);
    const publicKey = forge.util.decode64(publicKey64);

    const verifier = crypto.createVerify('SHA256');
    verifier.update(content);
    
    // Decode the base64-encoded signature to binary
    const signatureBinary = Buffer.from(signature, "binary");
    // const signatureBinary = Buffer.from(signature, "base64"); //if the signature is not binary

    // Verify the signature
    const isVerified = verifier.verify(publicKey, signatureBinary);
    
    return isVerified;
};


export const getDecipherContent = (iv: any, symmetricKey: any, data64: any) => {
  const decipher = forge.cipher.createDecipher('AES-CTR', symmetricKey);
  const data = forge.util.decode64(data64);

  decipher.start({iv: iv});
  decipher.update(forge.util.createBuffer(data, 'raw'));
  
  return decipher.output.getBytes();
}


export const encryptData = (publicKey: string, data: string) => {
  // Encrypt the symmetric key with the RSA public key using RSA-OAEP encryption
  const publicKeyObject = forge.pki.publicKeyFromPem(publicKey);
  const result = publicKeyObject.encrypt(data, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create()
    }
  });

  return forge.util.encode64(result);
}

// Decrypt the symmetric key using the RSA private key
export const decryptData = (privateKey: string, data64: string) => {
  // Decode the base64-encoded encrypted  
  const data = forge.util.decode64(data64);
  const privateKeyObject = forge.pki.privateKeyFromPem(privateKey);

  const result = privateKeyObject.decrypt(data, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
          md: forge.md.sha256.create()
      }
  });

  return result;
}

export const doubleDecrypt = (params: any): any => {
  const {
    privateKey, 
    encryptedSymmetricKey, 
    encryptedData, 
    encryptedIV
  } = params;

  // //console.log(encryptedSymmetricKey64, "=params")
  
  // Decode the base64-encoded encrypted symmetric key
  // const encryptedSymmetricKey = forge.util.decode64(encryptedSymmetricKey64);
  // const encryptedData = forge.util.decode64(encryptedData64);
  // const encryptedIV = forge.util.decode64(encryptedIV64);

  const symmetricKey = decryptData(privateKey, encryptedSymmetricKey)
  const iv =  decryptData(privateKey, encryptedIV);
  const decipher = getDecipherContent(iv, symmetricKey, encryptedData)

  const result = JSON.parse(decipher);

  return result;
}


// yarn ts-node --esm ./src/server.ts

export const decode64 = (data: string) => {
  return forge.util.decode64(data);
}

export const encode64 = (data: string) => {
  return forge.util.encode64(data);
}