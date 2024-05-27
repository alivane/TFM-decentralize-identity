import { getAgent } from './veramo/setup.js'

const checkVerifyCredential = async (credential: any)  =>{
  const agent = await getAgent();
  
  const result = await agent.verifyCredential({
    credential: credential
  })
  //console.log(`Credential verified`, result.verified)

  return result.verified;
}

export default checkVerifyCredential;