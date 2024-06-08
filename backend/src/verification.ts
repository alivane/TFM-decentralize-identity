
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import { validateTimestamp, verifySignature, decode64, encode64,  doubleDecrypt, encryptData, decryptData, generateCode } from "./encrypted.js";


// import { generateDidDocument } from "./did.js";
import { generateDidDocument } from "./did-generation.js";
import { PinataClient } from "./pinata-api.js";
import DataService from "./database/users.js";
import DataServiceCurrencyExchange from "./database/currency_exchange.js";
import DataServiceContractCurrencies from "./database/contract_currencies.js";
import { IContractCurrency, ICurrencyExchange } from "./database/types.js";

const PINATA_KEY = process.env.PINATA_KEY || "";
const PINATA_SECRET = process.env.PINATA_SECRET || "";
const APP_PRIVATE_KEY = process.env.APP_PRIVATE_KEY || "";
const APP_PUBLIC_KEY = process.env.APP_PUBLIC_KEY || "";

export const validatePublicKeyExist =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  const is_user_exist = await DataService.getByPublicKey(message_decrypted.publicKey);
  //console.log(is_user_exist, "=is_user_exist")

  if (is_user_exist) {
    return [400, { success: false, message: 'User or public key is already registrated' }];
  }

  return [200, { success: true, message: 'User or public key is not registrated' }];
};


export const getPublicKeyByDid =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  const data = await DataService.getByDid(message_decrypted.did);
  //console.log(data, "=message_decrypted", message_decrypted)
  
  if (!data) {
    return [400, { success: false, message: 'The user is not exist' }];
  }
  return [
    200, 
    { 
      success: true, 
      message: 'User or public key is registrated',
      data: { publicKey: data?.public_key}
    },
    
  ];
};

export const getDidByPublicKey =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  //console.log(message_decrypted, "=message_decrypted")
  const data: any = await DataService.getByPublicKey(message_decrypted.publicKey);
  //console.log(data, "=message_decrypted public key", message_decrypted)
  
  if (!data) {
    return [400, { success: false, message: 'The user is not exist' }];
  }
  return [
    200, 
    { 
      success: true, 
      message: 'User or public key is registrated',
      data: { did: encode64(data?.did)}
    },
    
  ];
};

export const getProfileByDid =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  const did = decode64(message_decrypted.did);
  // console.log(did, "did")
  // const data = await DataService.getByDid();
  const data = await DataService.getByDid(did);
  // console.log(data, "=message_decrypted", message_decrypted)
  
  if (!data) {
    return [400, { success: false, message: 'The user is not exist' }];
  }
  return [
    200, 
    { 
      success: true, 
      message: 'User Profile',
      data: encode64(JSON.stringify({ 
        email: data?.email,
        name: data?.name,
        last_name: data?.last_name,
        document_id: data?.document_id,
      }))
    },
  ];
};

export const deleteProfile =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  // const data = await DataService.getByDid(decode64(message_decrypted.did));
  const did = decode64(message_decrypted.did);
  const data = await DataService.getByDid(did);
  if (!data) {
    return [400, { success: false, message: 'The user is not exist' }];
  }

  await DataService.delete(did);
  await DataServiceContractCurrencies.deleteByDID(did);
  await DataServiceCurrencyExchange.deleteByDID(did);
  
  return [
    200, 
    { 
      success: true, 
      message: 'User Deleted',
      data: []
    },
  ];
};


export const updateUserInfo =  async (message_decrypted: any) => {
  // VALIDATE IF PUBLIC KEY IS already REGISTRATED
  // const data = await DataService.getByDid(decode64(message_decrypted.did));
  const did = decode64(message_decrypted.data.did);
  const data = await DataService.getByDid(did);
  if (!data) {
    return [400, { success: false, message_decrypted: 'The user is not exist' }];
  }

  await DataService.updateFieldByDid(
    did,
    message_decrypted.data.field,
    message_decrypted.data.value
  );
  
  return [
    200, 
    { 
      success: true, 
      message: 'User Info Updated',
      data: []
    },
  ];
};

export const createDidUser = async (message_decrypted: any) => {
  // ADD THE DID HERE

  //console.log(message_decrypted.publicKey, "====message_decrypted.publicKey")
  const publicKey64 = message_decrypted.publicKey;
  const pem =  decode64(publicKey64);
  const data: any = JSON.parse(decode64(message_decrypted.data));
  const didDocument = generateDidDocument(pem);
  //console.log(didDocument, "=didDocument")
  const pinataClient = new PinataClient(PINATA_KEY, PINATA_SECRET);
  const cid = await pinataClient.pinFileToIPFS(didDocument.id, didDocument);

  //console.log(data, "====data", message_decrypted)

  const dataRecord = {
    did: didDocument.id,
    cid: cid,
    public_key: [message_decrypted.publicKey],
    last_modified: new Date(),
    email: data.email,
    name: data.firstName,
    last_name: data.lastName,
    document_id: data.documentId,
  }

  await DataService.create(
    dataRecord
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

    //console.log(is_valid_timestamp, "=is_valid_timestamp")
    const is_verified = verifySignature(
      message_decrypted.fileContent,
      message_decrypted.signature,
      message_decrypted.publicKey
    );

    //console.log(is_verified, "====is_verified")
    // Check if the signature is verified
    if (!is_verified) {
      return [
        400,
        { success: false, message: 'The signature does not correspond to the public key provided or the code is not correct.' }
      ]
    }

    return [200, { success: true, message: 'Successfully signature validated', data: {} }];
}

export const signatureVerificationByDid = async (message_decrypted: any) => {
  const content_decrypted = decryptData(APP_PRIVATE_KEY, message_decrypted.fileContent);
  const is_valid_timestamp = validateTimestamp(content_decrypted);

  if (!is_valid_timestamp) {
    return [
      400,
      { success: false, message: 'The limit time is passed, make the process from the start.' }
    ];
  }


  //console.log(message_decrypted.did, "=message_decrypted.did")
  //console.log(decode64(message_decrypted.did), "=message_decrypted.did")
  const data = await DataService.getByDid(decode64(message_decrypted.did));
  //console.log(data, "=data")
  const publicKey: string = data?.public_key[0] || '';

  //console.log(is_valid_timestamp, "=is_valid_timestamp")
  const is_verified = verifySignature(
    message_decrypted.fileContent,
    message_decrypted.signature,
    publicKey
  );

  //console.log(
  //   message_decrypted.fileContent, message_decrypted.signature, publicKey,
  //    "=message_decrypted.fileContent, message_decrypted.signature, publicKey DID"
  // )

  //console.log(is_verified, "====is_verified")
  // Check if the signature is verified
  if (!is_verified) {
    return [
      400,
      { success: false, message: 'The signature does not correspond to the public key provided or the code is not correct.' }
    ]
  }

  return [200, { success: true, message: 'Successfully signature validated', data: {} }];
}


export const createCurrencyExchange = async (data: ICurrencyExchange) => {
  const exchangeData: ICurrencyExchange = {
    ...data
  };

  await DataServiceCurrencyExchange.createExchange(
    exchangeData
  );

  return [
    200,
    { 
      success: true, 
      message: 'Successfully currency exchange created'
    }
  ]
}


export const createContractCurrency = async (data: IContractCurrency) => {
  // ADD THE DID HERE
  
  const contractCurrency: IContractCurrency = {
    ...data
  };

  await DataServiceContractCurrencies.create(
    contractCurrency
  );

  return [
    200,
    { 
      success: true, 
      message: 'Successfully contract created'
    }
  ]
}

export const searchByCountryAndSellValue = async (message_decrypted: any) => {
  // ADD THE DID HERE
  
  const country = message_decrypted.data.country;
  const currencies = message_decrypted.data.currencies;
  
  const result = await DataServiceCurrencyExchange.searchByCountryAndSellValue(
    country, currencies
  );

  //console.log(result, "=result===")
  return [
    200,
    { 
      success: true, 
      message: 'Successfully currency exchange created',
      data: result
    }
  ]
}


export const getCurrenciesByDid = async (message_decrypted: any) => {
  // ADD THE DID HERE

  //console.log(message_decrypted.did, "=message_decrypted.did")
  const result = await DataServiceCurrencyExchange.getExchangesByDID(
    decode64(message_decrypted.did)
  );

  //console.log(result, "=result===")
  return [
    200,
    { 
      success: true, 
      message: 'Successfully!',
      data: result
    }
  ]
}


export const getContractsByDID = async (message_decrypted: any) => {
  // ADD THE DID HERE

  //console.log(message_decrypted.did, "=message_decrypted.did")
  const result = await DataServiceContractCurrencies.getContractsByDID(
    decode64(message_decrypted.did)
  );

  //console.log(result, "=result===")
  return [
    200,
    { 
      success: true, 
      message: 'Successfully!',
      data: result
    }
  ]
}

