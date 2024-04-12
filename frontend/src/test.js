const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MTg5YzQyMi1iYTIwLTRmYTQtYTAyNi1lYjI4YzRmYjQzZTAiLCJlbWFpbCI6InZhbmVnNjQzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMmIyMWM1YzkyYTE1NTc3NWY5YiIsInNjb3BlZEtleVNlY3JldCI6ImQ3ZTUzOTQ3MWRjNzM4ZTg0YWZjYTY4MTE3NGY2NTU5ODNiNDlmNzgwMjhhNGQ0YzJlZjM5ZmI1YjUzZTNjZDEiLCJpYXQiOjE3MTA2Mjc0MTJ9.OAvKPJ_yVg1lWrVr9Q7jTEiMYNo6a8CZc_aOvDS9TAM

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()


// CURL
// curl --request GET 	--url https://api.pinata.cloud/data/testAuthentication 	--header 'accept: application/json' 	--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MTg5YzQyMi1iYTIwLTRmYTQtYTAyNi1lYjI4YzRmYjQzZTAiLCJlbWFpbCI6InZhbmVnNjQzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMmIyMWM1YzkyYTE1NTc3NWY5YiIsInNjb3BlZEtleVNlY3JldCI6ImQ3ZTUzOTQ3MWRjNzM4ZTg0YWZjYTY4MTE3NGY2NTU5ODNiNDlmNzgwMjhhNGQ0YzJlZjM5ZmI1YjUzZTNjZDEiLCJpYXQiOjE3MTA2Mjc0MTJ9.OAvKPJ_yVg1lWrVr9Q7jTEiMYNo6a8CZc_aOvDS9TAM'

// API KEY
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MTg5YzQyMi1iYTIwLTRmYTQtYTAyNi1lYjI4YzRmYjQzZTAiLCJlbWFpbCI6InZhbmVnNjQzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMmIyMWM1YzkyYTE1NTc3NWY5YiIsInNjb3BlZEtleVNlY3JldCI6ImQ3ZTUzOTQ3MWRjNzM4ZTg0YWZjYTY4MTE3NGY2NTU5ODNiNDlmNzgwMjhhNGQ0YzJlZjM5ZmI1YjUzZTNjZDEiLCJpYXQiOjE3MTA2Mjc0MTJ9.OAvKPJ_yVg1lWrVr9Q7jTEiMYNo6a8CZc_aOvDS9TAM



// GATEWAY KEY
// pW_Js6W4Xw-Kwz_5b-7jb6lhzlEM3B-mULmJnxMkikP1En8cNZ5MyS9wRxccoko7
// https://bronze-advanced-quokka-223.mypinata.cloud/{CID}?pinataGatewayToken={Gateway API Key}

// FETCHING
// curl 'https://bronze-advanced-quokka-223.mypinata.cloud/ipfs/QmPyCYfL5oF79cfXjbt5cyr5hAZcyNrPNV9ytvUPdk8KT9?pinataGatewayToken=pW_Js6W4Xw-Kwz_5b-7jb6lhzlEM3B-mULmJnxMkikP1En8cNZ5MyS9wRxccoko7'






// API Key: 3272d8fad7a5d49ac6de
//  API Secret: a5319552184971bc835dc3f45c4f6f351a95421fd28268b2aea8316f83be4ccc
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MTg5YzQyMi1iYTIwLTRmYTQtYTAyNi1lYjI4YzRmYjQzZTAiLCJlbWFpbCI6InZhbmVnNjQzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzMjcyZDhmYWQ3YTVkNDlhYzZkZSIsInNjb3BlZEtleVNlY3JldCI6ImE1MzE5NTUyMTg0OTcxYmM4MzVkYzNmNDVjNGY2ZjM1MWE5NTQyMWZkMjgyNjhiMmFlYTgzMTZmODNiZTRjY2MiLCJpYXQiOjE3MTA2MjgzMTd9.-AJh3zhoCNXDjF8kesWNALrHWeieqtb8xCKigVa8H20