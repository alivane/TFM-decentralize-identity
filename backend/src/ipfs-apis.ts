import * as IPFS from 'ipfs-http-client';
import fs from 'fs';

// Initialize IPFS client
const ipfs = IPFS.create();

async function addFileToIPFS(filePath: string): Promise<string> {
    try {
        // Read file content
        const fileContent = await fs.promises.readFile(filePath);

        // Add file to IPFS
        const { cid } = await ipfs.add(fileContent);
        //console.log(`File uploaded to IPFS. CID: ${cid}`);
        return cid.toString();
    } catch (error) {
        console.error('Error adding file to IPFS:', error);
        throw error;
    }
}

async function publishIPNS(cid: string): Promise<string> {
    try {
        // Publish IPNS record
        const result = await ipfs.name.publish(cid, { resolve: false });
        //console.log(`IPNS record published. Name: ${result.name}`);
        return result.name;
    } catch (error) {
        console.error('Error publishing IPNS record:', error);
        throw error;
    }
}

async function main() {
    try {
        // Add file to IPFS
        const cid = await addFileToIPFS('./src/test.txt');

        // Publish IPNS record
        const ipnsName = await publishIPNS(cid);

        //console.log(`Access your content via IPNS: ipns://${ipnsName}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
