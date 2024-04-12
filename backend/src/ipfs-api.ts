import axios, { AxiosInstance } from 'axios';
import fs from 'fs';

interface PinataAPI {
    pinFileToIPFS(fileContent: Buffer): Promise<string>;
    createIPNSRecord(cid: string, customName?: string): Promise<string>;
}

class PinataClient implements PinataAPI {
    private axiosInstance: AxiosInstance;

    constructor(apiKey: string, apiSecret: string) {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.pinata.cloud',
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': apiKey,
                'pinata_secret_api_key': apiSecret
            }
        });
    }

    async pinFileToIPFS(fileContent: any): Promise<string> {
      try {
          // const formData = new FormData();
          // formData.append('file', file);
          // console.log(file.files)
          // formData.append(file.files[0].name, file.files[0]);

          const blob = new Blob([fileContent], { type: 'application/octet-stream' });
            const formData = new FormData();
            formData.append('file', blob, 'file.txt');

          const response = await this.axiosInstance.post('/pinning/pinFileToIPFS', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log('File pinned to IPFS:', response.data);
          return response.data.IpfsHash;
      } catch (error) {
          console.error('Error pinning file to IPFS:', error);
          throw error;
      }
  }

  async createIPNSRecord(cid: string, customName?: string): Promise<string> {
    try {
        const data = {
            cid: cid,
            customPinPolicy: {
                origins: [
                    {
                        origin: "*"
                    }
                ]
            },
            hostnames: [] // Add hostnames property here
        } as { // Type assertion
            cid: string;
            customPinPolicy: {
                origins: {
                    origin: string;
                }[];
            };
            hostnames: string[]; // Define the type of hostnames property
        };

        if (customName) {
            data.hostnames = [customName];
        }
        const response = await this.axiosInstance.post('/ipns/create', data);
        console.log('IPNS record created:', response.data);
        return response.data.ipns;
    } catch (error) {
        console.error('Error creating IPNS record:', error);
        throw error;
    }
}

}

const PINATA_KEY = process.env.PINATA_KEY;
const PINATA_SECRET = process.env.PINATA_SECRET;

// Example usage:
async function main() {
  const pinataClient = new PinataClient(PINATA_KEY, PINATA_SECRET);
    try {
        // Read file content from the file system
        const fileContent = fs.readFileSync('./src/test.txt');

        // Pin file content to IPFS
        const fileHash = await pinataClient.pinFileToIPFS(fileContent);
        console.log('File pinned to IPFS:', fileHash);

        // Create IPNS record
        const ipnsName = await pinataClient.createIPNSRecord(fileHash, "test1");
        console.log('IPNS record created:', ipnsName);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
