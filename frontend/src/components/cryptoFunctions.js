import JSEncrypt from 'jsencrypt';
import { saveAs } from 'file-saver';

const generateRandomString = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};


export function encryptRSA(publicKey, data) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(data);
}

export function decryptRSA(privateKey, encryptedData) {
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);
  console.log(privateKey,"PRIVATE KEY", encryptedData, decryptor.decrypt(encryptedData))
  return decryptor.decrypt(encryptedData);
}

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

  console.log(JSON.stringify(publicPrivateKey), "=publicPrivateKey")

  // Example public keys of recipients
  const publicKeys = [publicPrivateKey.PublicKey, publicPrivateKey.PublicKey1];

  // Message to be encrypted
  const message = 'Secret message';

  // Encrypt the message for multiple recipients
  const encryptedMessages = encryptMessageForMultipleRecipients(message, publicKeys);

  console.log(encryptedMessages, "=encryptedMessages")
  // Now you can send each encrypted message to the corresponding recipient

  // Recipient 1 decrypts the message with their private key
  const decryptedMessage1 = decryptMessage(publicPrivateKey.PrivateKey, encryptedMessages[0]);

  // Recipient 2 decrypts the message with their private key
  const decryptedMessage2 = decryptMessage(publicPrivateKey.PrivateKey1, encryptedMessages[1]);

  console.log(decryptedMessage1, decryptedMessage2)

}


// hash:
// QmbGBVzUQ1oCCL8yLLyF8jsuDFpU2wAh9s4rjzmJsmmaDu
// private code:
// Kjaeov3Kw0cKhyio9G5d9sBOs5CTEkiRar3ZIHsOtcTHE+0iP2ywPsQfIvYUP8r2ZlpnbxTJpIRc0C+ak1ll9XpYuCZe0yw+uGF0c28yHKDp4IWUoiZdLvKzDxda8/d3MKaJ7Y1Z/SYw7W7YsmWsHaxwicvIygL2BiEw52puVEjmF5ZlagPbVdiVtPZLqxaxI9l92YqYlb5qypFps+XjeFt87+UQ287GkbUR0Ro8HjTyve97FW7F2zo8Kls4Bi4JJYcYncgFVnOlkNj+As8CeWQuj6H+xKPAl1H9W3IEcT0IcHQq/PoxMkSJCGgHoM6Nmyq4PZ5m8mkZx1cPwK+b8Q==
// pass:
// fzaa4roy