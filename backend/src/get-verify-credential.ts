import { getAgent } from './veramo/setup.js'

const getVerifyCredential = async (hash: string) => {
  const agent = await getAgent();

  const result = await agent.dataStoreGetVerifiableCredential({
    hash: hash
  });

  //console.log("cred: ");
  //console.log(JSON.stringify(result, null, 2));
  return result;

}

export default getVerifyCredential;

//  yarn ts-node --esm ./src/create-credential.ts