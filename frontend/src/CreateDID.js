import React, { useState } from 'react';
import { createAgent } from '@veramo/core';
import { DIDManager } from '@veramo/did-manager';
import { KeyDIDProvider } from '@veramo/did-provider-key';

function CreateDID() {
    const [did, setDid] = useState(null);

    const handleCreateDID = async () => {
        try {
            // Create Veramo agent
            const agent = createAgent({
                plugins: [
                    new DIDManager({
                        plugins: [
                            new KeyDIDProvider(),
                        ],
                    }),
                ],
            });

            // Get the DID manager plugin
            const didManager = agent.getPlugin(DIDManager);

            // Generate a new DID
            const newDid = await didManager.createIdentifier({
                provider: 'did:key',
            });

            setDid(newDid);
        } catch (error) {
            console.error('Error creating DID:', error);
        }
    };

    return (
        <div>
            <h2>Create a Decentralized Identifier (DID)</h2>
            <button onClick={handleCreateDID}>Create DID</button>
            {did && <p>New DID: {did}</p>}
        </div>
    );
}

export default CreateDID;


// "start": "react-scripts start",
// "build": "react-scripts build",
// "test": "react-scripts test",
// "eject": "react-scripts eject"