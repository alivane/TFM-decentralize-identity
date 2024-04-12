import { agent } from './veramo/setup.js'

async function main() {
  const result = await agent.verifyCredential({
    credential: {
      credentialSubject: {
        you: 'Rock',
        id: 'did:web:example.com/alisson',
      },
      issuer: {
        id: 'did:ethr:goerli:0x02d01c3544a120b1fe8262a10330aaeb973f6d1599685e50e672319eb0558ab74e',
      },
      type: ['VerifiableCredential'],
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      issuanceDate: '2024-03-19T11:01:23.000Z',
      proof: {
        type: 'JwtProof2020',
        jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20vYWxpc3NvbiIsIm5iZiI6MTcxMDg0NjA4MywiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4MDJkMDFjMzU0NGExMjBiMWZlODI2MmExMDMzMGFhZWI5NzNmNmQxNTk5Njg1ZTUwZTY3MjMxOWViMDU1OGFiNzRlIn0.wYHrOVkTEaKVzqv4OSDLGZs84BXDYrjAk2BfABZY30doXsGbkMCaVbe6MGYkjEEFyeRJovuop6mpssfbouDdCg',
      },
    },
  })
  console.log(`Credential verified`, result.verified)
}

main().catch(console.log)