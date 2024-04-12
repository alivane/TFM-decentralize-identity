import { useState } from "react";
import FileAttachment from "../components/FileAttachment";
import { postFileIPFS } from "../api";
import KeyPairGenerator from "../components/KeyPairGenerator";
// import CreateDID from './CreateDID';

function App() {
  const [cid, setCid] = useState();

  const handleSubmission = async (data) => {
    try {
      // console.log(data["name"], "data")
      const formData = new FormData();
      const metadata = JSON.stringify({
        name: data["name"],
      });
      const options = JSON.stringify({ cidVersion: 0 });

      formData.append("file", data);
      formData.append("pinataMetadata", metadata);
      formData.append("pinataOptions", options);
      
      const resData = await postFileIPFS(formData);
      setCid(resData.IpfsHash);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {/* <CreateDID /> */}
    <KeyPairGenerator />
      <FileAttachment handleSubmission={(data) => handleSubmission(data)}/>

      {
        cid && (
          <img
            src={`${process.env.REACT_APP_GATEWAY_URL}/ipfs/${cid}`}
            alt="ipfs image"
          />
        )
      }
    </>
  );
}

export default App;
