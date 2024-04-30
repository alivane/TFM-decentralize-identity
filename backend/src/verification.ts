
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import { validateTimestamp, verifySignature, doubleDecrypt, encryptData, decryptData, generateCode } from "./encrypted.js";


import { generateDidDocument } from "./did.js";
import { PinataClient } from "./pinata-api.js";
import DataService from "./database/users.js";

const PINATA_KEY = process.env.PINATA_KEY || "";
const PINATA_SECRET = process.env.PINATA_SECRET || "";
const APP_PRIVATE_KEY = process.env.APP_PRIVATE_KEY || "";
const APP_PUBLIC_KEY = process.env.APP_PUBLIC_KEY || "";

export const validatePublicKeyExist =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  const is_user_exist = await DataService.getByPublicKey(message_decrypted.publicKey);
  console.log(is_user_exist, "=is_user_exist")

  if (is_user_exist) {
    return [400, { success: false, message: 'User or public key is already registrated' }];
  }

  return [200, { success: true, message: 'User or public key is not registrated' }];
};


export const getPublicKeyByDid =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  const data = await DataService.getByDid(message_decrypted.did);
  console.log(data, "=message_decrypted", message_decrypted)
  
  if (!data) {
    return [400, { success: false, message: 'The user is not exist' }];
  }
  return [
    200, 
    { 
      success: true, 
      message: 'User or public key is not registrated',
      data: { publicKey: data?.public_key}
    },
    
  ];
};


export const createDidUser = async (message_decrypted: any) => {
  // ADD THE DID HERE
  const didDocument = generateDidDocument(message_decrypted.publicKey);
  const pinataClient = new PinataClient(PINATA_KEY, PINATA_SECRET);
  const cid = await pinataClient.pinFileToIPFS(didDocument.id, didDocument);

  
  await DataService.create(
    {
      did: didDocument.id,
      cid: cid,
      public_key: [message_decrypted.publicKey],
      last_modified: new Date(),
      email: "mail",
      name: "string,",
      last_name: "string,",
      document_id: "string,",
    }
  );

  return [
    200,
    { 
      success: true, 
      message: 'Successfully signature validated', 
      data: {
        did: didDocument.id,
        cid: cid
      } 
    }
  ]
}

export const signatureVerification = (message_decrypted: any) => {
    const content_decrypted = decryptData(APP_PRIVATE_KEY, message_decrypted.fileContent);
    const is_valid_timestamp = validateTimestamp(content_decrypted);

    if (!is_valid_timestamp) {
      return [
        400,
        { success: false, message: 'The limit time is passed, make the process from the start.' }
      ];
    }

    console.log(is_valid_timestamp, "=is_valid_timestamp")
    const is_verified = verifySignature(
      message_decrypted.fileContent,
      message_decrypted.signature,
      message_decrypted.publicKey
    );

    console.log(is_verified, "====is_verified")
    // Check if the signature is verified
    if (!is_verified) {
      return [
        400,
        { success: false, message: 'The signature does not correspond to the public key provided or the code is not correct.' }
      ]
    }

    return [200, { success: true, message: 'Successfully signature validated', data: {} }];
}