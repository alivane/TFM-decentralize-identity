export const getFileContentFromIPFS = async (ipfsHash) => {
  try {
    // const response = await fetch(
    //   `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
    //     },
    //   }
    // );

    const response = await fetch(`http://localhost:3001/getFileContent?ipfsHash=${ipfsHash}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file content from IPFS: ${response.statusText}`);
    }

    return await response.text(); // Return the content as text
  } catch (error) {
    console.error("Error fetching file content from IPFS:", error);
    throw error;
  }
}


export const postFileIPFS = async (data) => {
  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
        body: data,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to pin file to IPFS: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error pinning file to IPFS:", error);
    throw error;
  }
}
