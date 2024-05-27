import crypto from 'crypto';
import { DIDDocument, VerificationMethod } from 'did-resolver'; // Assuming you have a library for resolving DIDs

// Function to generate a random string (challenge)
function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}

// Function to generate a DID based on ipid
function generateIpidDID(): string {
  // Generate a unique identifier for the DID
  const uniqueId = generateRandomString(16);
  return `did:ipid:${uniqueId}`;
}

// Function to generate a basic DID document for authentication with an RSA public key
export function generateDidDocument(publicKey: string): DIDDocument {
  const did = generateIpidDID();
  return {
    '@context': 'https://www.w3.org/ns/did/v1',
    id: did,
    authentication: [
      {
        id: `${did}#key-1`,
        type: 'RsaVerificationKey2018', // Assuming RSA keys are used for signing
        publicKeyBase64: publicKey, // Public key used for authentication
      } as VerificationMethod,
    ],
    verificationMethod: [
      {
        id: `${did}#key-1`,
        type: 'RsaVerificationKey2018', // Assuming RSA keys are used for signing
        publicKeyBase64: publicKey, // Public key used for verification
      } as VerificationMethod,
    ],
    // Add other required fields as needed
  };
}


// // Example usage
// const userDid = generateIpidDID(); // Example user DID
// const publicKey = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFoeTF3cUJpSzIyODNNbmlRdWdNdwpWZVE4aER6R3BIU1BTTHM3L0hpZFNyUzEyamdTQTU1T1laTVFTMmgwbFZ5b0pkT1ppOHU1MUhOd1Z4UzhrUXZ5CmFkblg2NU9KWE01U1Rsd05CVmRCTDlpQmo2WmI1QnZDVWIrcDcwa3krcWw2bEdOOUtyU0l0QjZ5c0ZlTXpQM0kKNUhPUkNnODlkdFVFZ1J6cTFkZWZhUy85UFpCWDhQUW5HMUs5WVJyMXg2a29YcWFkamVJODM0MGZCR1B6YmliZQpHejdoLzJnYXRHZXhVQUd1NTVoVkllUFRBRU4xYVFxTDlCS01jQ25TSG1Oa2ZXTDBhOHVlVVI2ckNBblU5Q0dWClBUbWZCWlJMZHR5aHU3VHAyS2dad042QUovU3FRVE9WeUE3ZTlOTEgzZlpVeTA3Tzg3TjhEUkdvcGhjVW5EN0sKNFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"; // User's RSA public key
// const didDocument = generateDidDocument(userDid, publicKey);

// //console.log(didDocument);