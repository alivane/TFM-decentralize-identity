import  forge from 'node-forge';
import baseX from 'base-x';

const generateDidSubject = (pem: string) => {
  // Convert PEM to a Forge public key object
  const publicKey = forge.pki.publicKeyFromPem(pem);
  
  // Convert the public key to DER format
  const derBuffer = forge.asn1.toDer(forge.pki.publicKeyToAsn1(publicKey)).getBytes();
  
  // Convert the binary DER to a Buffer for use in Node.js
  const der = Buffer.from(derBuffer, 'binary');
  
  // Define the multicodec prefix for DER-encoded RSA public keys (0x1205)
  const multicodecPrefix = Buffer.from([0x12, 0x05]);
  
  // Combine the multicodec prefix and DER data
  const combinedBuffer = Buffer.concat([multicodecPrefix, der]);
  
  // Base58 encode the combined buffer
  const base58 = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
  // const base58Encoded = base58.encode(combinedBuffer);
  const base58Encoded = base58.encode(combinedBuffer);
  
  // Construct the DID string
  const didString = `did:key:z4MX${base58Encoded}`;
  
  return didString;
}


// https://medium.com/@adam_14796/understanding-decentralized-ids-dids-839798b91809
// https://didlint.ownyourdata.eu/validate
// https://app.pinata.cloud/pinmanager
// https://www.w3.org/2019/08/did-20190828/#contexts > example 8
export const generateDidDocument = (pem: string) => {
    const did = generateDidSubject(pem);
    return {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/v1"
      ],
      "id": did,
      "publicKey": [
        {
          "id": `${did}#keys-1`,
          "type": "RsaVerificationKey2018",
          "controller": did,
          "publicKeyPem": pem
        }
      ],
      "authentication": [
        {
          "id": `${did}#keys-1`,
          "type": "RsaSignatureAuthentication2018",
          "controller": did,
          "publicKeyPem": pem
        }
      ]
    }
    
}


