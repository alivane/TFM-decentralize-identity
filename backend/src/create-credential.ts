import { getAgent } from './veramo/setup.js'

const createCredentials = async (
  data: any
) => {
  const agent = await getAgent();

  const DID_SUBJECT =  process.env.VERAMO_DID_SUBJECT || "";
  const identifier = await agent.didManagerGet({ did: DID_SUBJECT })

  //console.log("jhhhherer", identifier)
  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      '@context': [
        "https://www.w3.org/2018/credentials/v1",
        "https://veramo.io/contexts/profile/v1"
      ],
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        ...data
      },
    },
    proofFormat: 'jwt',
  })
  //console.log(`New credential created`)
  //console.log(JSON.stringify(verifiableCredential, null, 2))

  const credentialId = await agent.dataStoreSaveVerifiableCredential({ verifiableCredential })
  
  //console.log("New credential saved")
  //console.log(credentialId)

  return credentialId;
}

export default createCredentials;

//  yarn ts-node --esm ./src/create-credential.ts