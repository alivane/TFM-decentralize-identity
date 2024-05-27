import JSEncrypt from 'jsencrypt';
import { saveAs } from 'file-saver';
import forge from 'node-forge';
import CryptoJS from 'crypto-js';

// RESOURCE
// https://opensource.com/article/19/6/cryptography-basics-openssl-part-2
// openssl dgst -sha256 -sign TEST_private.pem -out signature.bin EXPID_file_for_sign.expid 
// openssl enc -base64 -in signature.bin -out signature1.bin
// openssl dgst -sha256 -verify TEST_public.crt -signature signature.bin TEST_EXPID_file_for_sign.expid 
// REVISAR: https://medium.com/@kaishinaw/signing-and-verifying-ethereum-hashed-messages-fefa46a746f2

const generateRandomString = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

function generateRandomKey() {
  return forge.random.getBytesSync(16); // 128-bit key
}


const encryptDataAsymmetricKey = (publicKey, data) => {
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

const encryptDataSymmetricKey = (symmetricKey, iv, data) => {
  // Convert symmetric key to a Forge buffer
  const symmetricKeyBuffer = forge.util.createBuffer(symmetricKey, 'raw');
  
  // Encrypt the JSON string with the symmetric key using AES encryption
  const cipher = forge.cipher.createCipher('AES-CTR', symmetricKeyBuffer);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(data, 'utf8'));
  cipher.finish();
  
  const result = cipher.output.getBytes();

  return forge.util.encode64(result);
}

const decryptedDataSymmetricKey = (symmetricKey, iv, data64) => {
  const data = forge.util.decode64(data64);
  // Convert symmetric key to a Forge buffer
  const decipher = forge.cipher.createDecipher('AES-CTR', symmetricKey);
  decipher.start({iv: iv});
  decipher.update(forge.util.createBuffer(data, 'raw'));

  const result = decipher.output.getBytes();
  
  return result;
}


// Function to encrypt JSON data with RSA using OAEP padding
export function encryptData(publicKeyPem, jsonData) {
  // Generate a random symmetric encryption key (AES key)
  const symmetricKey = generateRandomKey();
  const iv = generateRandomKey();

  // Convert JSON data to a string
  const jsonString = JSON.stringify(jsonData);
  const encryptedData = encryptDataSymmetricKey(symmetricKey, iv, jsonString);
  const encryptedSymmetricKey = encryptDataAsymmetricKey(publicKeyPem, symmetricKey);
  const encryptediv = encryptDataAsymmetricKey(publicKeyPem, iv);
  
  // console.log("==================================")
  const decryptedData = decryptedDataSymmetricKey(symmetricKey, iv, encryptedData)
  // console.log(JSON.parse(decryptedData), "=============decryptedData")

  return {
    key: encryptedSymmetricKey,
    data: encryptedData,
    iv: encryptediv
  };
}

// // Function to encrypt JSON data with RSA
// export function encryptData(publicKey, jsonData) {
//   // Generate a random symmetric encryption key (AES key)
//   const symmetricKey = generateSymmetricKey();
  
//   // Convert JSON data to string
//   const jsonString = JSON.stringify(jsonData);
  
//   // Convert symmetricKey to a format that can be used with AES encryption
//   const aesKeyHex = CryptoJS.enc.Hex.stringify(symmetricKey);

//   // Encrypt the JSON string with the symmetric key using AES encryption
//   const encryptedData = CryptoJS.AES.encrypt(jsonString, aesKeyHex).toString();
  
//   // Encrypt the symmetric key with the RSA public key
//   const encryptor = new JSEncrypt();
//   encryptor.setPublicKey(publicKey);
//   // const encryptedSymmetricKey = encryptor.encrypt(aesKeyHex, 'RSA-OAEP');
//   const encryptedSymmetricKey = encryptor.encryptOAEP(aesKeyHex);
//   // Return the encrypted symmetric key and the encrypted data
//   return {
//     key: encryptedSymmetricKey,
//     data: encryptedData
//   };
// }


export function decryptData(privateKey, encryptedSymmetricKey, encryptedData) {
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);

  const decryptedSymmetricKeyHex = decryptor.decrypt(encryptedSymmetricKey);
  // Decrypt the encrypted data with the decrypted symmetric key using AES decryption
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, decryptedSymmetricKeyHex).toString(CryptoJS.enc.Utf8);
  // Parse decrypted JSON data
  const jsonData = JSON.parse(decryptedData);
  
  // Return the decrypted JSON data
  return jsonData;
}



// Function to decrypt data with RSA private key and encrypted symmetric key
export function decryptRSA(privateKey, encryptedSymmetricKey, encryptedData) {
  try {
    // Decrypt the symmetric key with the RSA private key
    const decryptedSymmetricKey = crypto.privateDecrypt({
      key: privateKey,
      passphrase: '', // Add passphrase if applicable
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING // Use the appropriate padding scheme
    }, Buffer.from(encryptedSymmetricKey, 'base64')).toString();

    // Convert the decrypted symmetric key to a Buffer
    const symmetricKeyBuffer = Buffer.from(decryptedSymmetricKey, 'hex');

    // Decrypt the encrypted data with the decrypted symmetric key
    const decipher = crypto.createDecipheriv('aes-256-cbc', symmetricKeyBuffer, Buffer.alloc(16));
    let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
    decryptedData += decipher.final('utf8');

    // Return the decrypted data
    return decryptedData;
  } catch (error) {
    console.error('Decryption Error:', error);
    throw new Error('Decryption failed');
  }
}

// // Function to encrypt JSON data with RSA
// export function encryptRSA(publicKey, jsonData) {
//   // Generate a random symmetric encryption key (AES key)
//   const symmetricKey = CryptoJS.lib.WordArray.random(16); // 128-bit key
  
//   // Convert JSON data to string
//   const jsonString = jsonData;
//   // console.log(jsonData, "=jsonData")
//   // Encrypt the JSON string with the symmetric key using AES encryption
//   const encryptedData = CryptoJS.AES.encrypt(jsonString, symmetricKey).toString();
//   // console.log(encryptedData, "=encryptedData")
//   // Encrypt the symmetric key with the RSA public key
//   const encryptor = new JSEncrypt();
//   encryptor.setPublicKey(publicKey);
//   const encryptedSymmetricKey = encryptor.encrypt(symmetricKey.toString(CryptoJS.enc.Base64));
  
//   // Return the encrypted symmetric key and the encrypted data
//   return {
//     encryptedSymmetricKey,
//     encryptedData
//   };
// }


// export function encryptRSA(publicKey, data) {
//   // console.log(CryptoJS.SHA256(data).toString())
//   const encryptor = new JSEncrypt();
//   encryptor.setPublicKey(publicKey);
//   // console.log(encryptor.getPublicKey(), data, typeof(data));
//   return encryptor.encrypt(data);
// }

// export function decryptRSA(privateKey, encryptedData) {
//   const decryptor = new JSEncrypt();
//   decryptor.setPrivateKey(privateKey);
//   // console.log(privateKey,"PRIVATE KEY", encryptedData, decryptor.decrypt(encryptedData))
//   return decryptor.decrypt(encryptedData);
// }

export function createRSA() {
  const crypt = new JSEncrypt({default_key_size: 2048});

  const publicPrivateKey = {
    PublicKey: crypt.getPublicKey(),
    PrivateKey:crypt.getPrivateKey()
  };

  // Create a new Blob with the PEM content
  const blobPrivate = new Blob([publicPrivateKey.PrivateKey], { type: 'text/plain;charset=utf-8' });
  const randomName = `${generateRandomString(10)}_${Date.now()}`;
  // Trigger the file download
  saveAs(blobPrivate, `${randomName}.pem`);

  // Create a new Blob with the PEM content
  const blobPublic = new Blob([publicPrivateKey.PublicKey], { type: 'text/plain;charset=utf-8' });
  // Trigger the file download
  saveAs(blobPublic, `${randomName}.crt`);

  return publicPrivateKey;
}

// PUBLIC KEY can verify and encrypt
// PRIVATE KEY can sign and decrypt

export function encryptMessageForMultipleRecipients(message, publicKeys) {
  const encryptedMessages = [];

  // Encrypt the message with each public key
  publicKeys.forEach((publicKey) => {
    const recipient = new JSEncrypt();
    recipient.setPublicKey(publicKey);
    const encryptedMessage = recipient.encrypt(message);
    encryptedMessages.push(encryptedMessage);
  });

  return encryptedMessages;
}

function decryptMessage(privateKey, encryptedMessage) {
  const recipient = new JSEncrypt();
  recipient.setPrivateKey(privateKey);
  return recipient.decrypt(encryptedMessage);
}

export function test() {
  const crypt = new JSEncrypt({default_key_size: 2048});
  const crypt1 = new JSEncrypt({default_key_size: 2048});

  const publicPrivateKey = {
    PublicKey: crypt.getPublicKey(),
    PrivateKey:crypt.getPrivateKey(),
    PublicKey1: crypt1.getPublicKey(),
    PrivateKey1:crypt1.getPrivateKey()
  };

  // console.log(JSON.stringify(publicPrivateKey), "=publicPrivateKey")

  // Example public keys of recipients
  const publicKeys = [publicPrivateKey.PublicKey, publicPrivateKey.PublicKey1];

  // Message to be encrypted
  const message = 'Secret message';

  // Encrypt the message for multiple recipients
  const encryptedMessages = encryptMessageForMultipleRecipients(message, publicKeys);

  // console.log(encryptedMessages, "=encryptedMessages")
  // Now you can send each encrypted message to the corresponding recipient

  // Recipient 1 decrypts the message with their private key
  const decryptedMessage1 = decryptMessage(publicPrivateKey.PrivateKey, encryptedMessages[0]);

  // Recipient 2 decrypts the message with their private key
  const decryptedMessage2 = decryptMessage(publicPrivateKey.PrivateKey1, encryptedMessages[1]);

  // console.log(decryptedMessage1, decryptedMessage2)

}


// hash:
// QmbGBVzUQ1oCCL8yLLyF8jsuDFpU2wAh9s4rjzmJsmmaDu
// private code:
// Kjaeov3Kw0cKhyio9G5d9sBOs5CTEkiRar3ZIHsOtcTHE+0iP2ywPsQfIvYUP8r2ZlpnbxTJpIRc0C+ak1ll9XpYuCZe0yw+uGF0c28yHKDp4IWUoiZdLvKzDxda8/d3MKaJ7Y1Z/SYw7W7YsmWsHaxwicvIygL2BiEw52puVEjmF5ZlagPbVdiVtPZLqxaxI9l92YqYlb5qypFps+XjeFt87+UQ287GkbUR0Ro8HjTyve97FW7F2zo8Kls4Bi4JJYcYncgFVnOlkNj+As8CeWQuj6H+xKPAl1H9W3IEcT0IcHQq/PoxMkSJCGgHoM6Nmyq4PZ5m8mkZx1cPwK+b8Q==
// pass:
// fzaa4roy




export function examplecreateSignature(t, data) {
  // const crypt = new JSEncrypt();

  // const privateKey = process.env.REACT_APP_TEST_PRIVATE_KEY;
  // crypt.setPrivateKey(privateKey);
  // // console.log(crypt.getPrivateKey())
  const crypt = new JSEncrypt({default_key_size: 2048});

  // const publicPrivateKey = {
  //   PublicKey: crypt.getPublicKey(),
  //   PrivateKey:crypt.getPrivateKey()
  // };

  // console.log(data, "=data")
  const signature = crypt.sign(data, 'SHA512');
  // console.log(signature, "=signature")

  // Create a hash of the data using SHA256
  // const hash = crypto.createHash('sha256').update(data).digest('hex');

  // Initialize a new JSEncrypt instance
  // const crypt = new JSEncrypt();

  // Set the private key
  // crypt.setPrivateKey(privateKey);

  // Sign the data using SHA256
  // Create a signer object with the private key
  // const signer = crypto.createSign('RSA-SHA256');
  // signer.update(data);

  // // Sign the hash with the private key
  // const signature = signer.sign(privateKey, 'base64');
  // // console.log(signature, "=signature")
  // // Hash the data using SHA256
  // const hash = crypto.SHA256(data);
  
  // // Create a digital signature using the private key
  // const signature = crypto.HmacSHA256(hash, privateKey).toString();
  
  // // console.log(process.env.REACT_APP_TEST_PRIVATE_KEY, "=process.env.REACT_APP_TEST_PRIVATE_KEY", data)
  // // console.log(signature, "=signature")
  // // const signature = crypt.sign(data, 'sha256');
  // // // console.log(signature, "=signature")
  // // return signature;
  // // Create a new Blob with the PEM content
  // const blob = new Blob([signature], { type: 'text/plain;charset=utf-8' });
  // // const randomName = `${generateRandomString(10)}_${Date.now()}`;
  // // Trigger the file download
  // saveAs(blob, `TEST_SIGNATURE.p7s`);
}