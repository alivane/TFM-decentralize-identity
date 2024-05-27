import { getAgent } from './veramo/setup.js'

const listCredentials = async () => {
  const agent = await getAgent();

  const creds = await agent.dataStoreORMGetVerifiableCredentials({});

  //console.log("cred: ");
  //console.log(JSON.stringify(creds, null, 2));
  return creds;

}

export default listCredentials;

//  yarn ts-node --esm ./src/create-credential.ts