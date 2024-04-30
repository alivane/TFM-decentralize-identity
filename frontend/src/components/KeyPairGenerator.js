import React, { useState } from 'react';
import { encryptRSA, decryptRSA, createRSA } from '../utils/cryptoFunctions';

function AsymmetricKeyPairGenerator() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [data, setData] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  const handleEncrypt = () => {
    const encrypted = encryptRSA(publicKey, data);
    setEncryptedData(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = decryptRSA(privateKey, encryptedData);
    setDecryptedData(decrypted);
  };

  const handleCreateRSA = () => {
    const rsa = createRSA();
    console.log(rsa.PrivateKey, rsa.PublicKey);
  }

  return (
    <div>
      <textarea value={publicKey} onChange={(e) => setPublicKey(e.target.value)} placeholder="Enter public key" />
      <textarea value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} placeholder="Enter private key" />
      <textarea value={data} onChange={(e) => setData(e.target.value)} placeholder="Enter data" />
      <button onClick={handleEncrypt}>Encrypt</button>
      <textarea value={encryptedData} readOnly placeholder="Encrypted data" />
      <button onClick={handleDecrypt}>Decrypt</button>
      <textarea value={decryptedData} readOnly placeholder="Decrypted data" />
      

      <button onClick={handleCreateRSA}>Create RSA</button>
    </div>
  );
}


export default AsymmetricKeyPairGenerator;
