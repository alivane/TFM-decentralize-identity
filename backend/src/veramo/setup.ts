// Core interfaces
import {
  createAgent,
  IDIDManager,
  TAgent,
} from '@veramo/core'
import { AgentRestClient } from '@veramo/remote-client';

const API_KEY = process.env.VERAMO_API_KEY || "";
const AGENT_OPEN_API = process.env.VERAMO_AGENT_OPEN_API || "";

export async function getAgent(): Promise<TAgent<IDIDManager>> {
  const response = await fetch(AGENT_OPEN_API);
  const schema =  await response.json();
  const agent = createAgent<IDIDManager>({
    plugins: [
      new AgentRestClient({
        url: schema.servers[0].url,
        headers: { Authorization: `Bearer ${API_KEY}`},
        enabledMethods: Object.keys(schema["x-methods"]),
        schema,
      }),
    ],
  })

  return agent;
}

// yarn ts-node --esm ./src/create-identifier.ts
// yarn ts-node --esm ./src/list-identifiers.ts
// yarn ts-node --esm ./src/create-credential.ts
// yarn ts-node --esm ./src/verify-credential.ts

// yarn ts-node --esm ./prueba/server.ts
// https://dashboard.render.com/web/srv-cop8khi0si5c73bsdlm0/env