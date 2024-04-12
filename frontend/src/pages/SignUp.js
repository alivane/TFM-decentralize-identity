import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, 
  Typography, 
  Box, 
  Container, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { postFileIPFS } from "../api";
import Loader from "../components/Loader";
import CopyText from "../components/CopyText";
import { createRSA, encryptMessageForMultipleRecipients } from '../components/cryptoFunctions';

const useStyles = makeStyles((theme) => ({
  container: {
    // marginTop: theme.spacing(4),
    textAlign: 'center',
    width: '100%',
    height: "100vh",
    display: "flex!important",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    margin: "2% auto!important",
    padding: "20px !important",
    width: "80%"
  },
  containerDialog: {
    textAlign: 'center',
    display: "flex!important",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    // marginRight: "1%",
  },
}));
// QmVxaJTLQgjs43i1QX1sqDWGd1JFAMsu4ckb4DnfeZt1Sw TEST
function SignUp() {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentJson, setContentJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const fileInputRef = useRef(null);

  const [cid, setCid] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(()=> {
    if (selectedFile) {
      setOpenDialog(true)
    }
  }, [selectedFile]);


  useEffect(() => {
    if (contentJson === null) return;
    else {
      async function fetchData() {
        try {          
          // Convert JSON data to a string
          const jsonString = JSON.stringify(contentJson);
          
          // Create a new File object with the JSON string as content
          const file = new File([jsonString], "example.json", { type: "application/json" });

          const formData = new FormData();
          const metadata = JSON.stringify({
            name: "test1",
          });
          const options = JSON.stringify({ cidVersion: 0 });
          formData.append("file", file);
          formData.append("pinataMetadata", metadata);
          formData.append("pinataOptions", options);
          
          const resData = await postFileIPFS(formData);
          setCid(resData.IpfsHash);
          
          setLoading(false);
          setOpenDialog(false);
    
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [contentJson]);


  const handleDialogClose = () => {
    setSelectedFile(null);
    fileInputRef.current.value = '';
    setOpenDialog(false);
  };

  const handleUploadCert = () => {
    setLoading(true);
    const reader = new FileReader();
    const privateCode = Math.random().toString(36).substring(2, 10);
    reader.onload = (event) => {
      // Create JSON object and append file content
      const encryptPrivateKey = encryptMessageForMultipleRecipients(
        privateCode,
        [event.target.result, process.env.REACT_APP_PUBLIC_KEY]
      );
      const newJsonData = {
        version: 1,
        publicKey: event.target.result,
        privateCode: encryptPrivateKey[0],
        privateCodeWeb: encryptPrivateKey[1],
      };
      setContentJson(newJsonData);
      setSecretKey(newJsonData.privateCode);
    };
    reader.readAsText(selectedFile);
    setSelectedFile(null);
    fileInputRef.current.value = '';
  };

  const handleDownload = () => {
    setLoading(true);
    const rsa = createRSA();

    const privateCode = Math.random().toString(36).substring(2, 10);
    const encryptPrivateKey = encryptMessageForMultipleRecipients(
      privateCode,
      [rsa.PublicKey, process.env.REACT_APP_PUBLIC_KEY]
    );

    const newJsonData = {
      version: 1,
      publicKey: rsa.PublicKey,
      privateCode: encryptPrivateKey[0],
      privateCodeWeb: encryptPrivateKey[1],
    };
    setContentJson(newJsonData);
    setSecretKey(newJsonData.privateCode);
  };

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      {
        cid ? (
          <div>
            <Typography variant="h4" color="secondary">Keep these generated CODES safe for secure access to our application.</Typography>
            <Typography variant="h5" color="secondary">CID or Hash.</Typography>
            <CopyText text={cid} />
            <Typography variant="h5" color="secondary">Private Code.</Typography>
            <CopyText text={secretKey} />
            <Typography variant="h6" color="secondary">**Is required to enter with the decrypt of this PRIVATE CODE for signIn.</Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h4">Sign Up</Typography>
            
            <div>
              {
                loading && (
                  <Loader />
                )
              }
              <input
                accept=".crt"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef} // Set ref to the input element
              />
              <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    component="span"
                    disabled={loading}
                    startIcon={<CloudUploadIcon className={classes.icon}/>}
                    size="large"
                  >
                      Register Public key
                  </Button>
              </label>

              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                disabled={loading}
                onClick={handleDownload}
                startIcon={<DownloadIcon className={classes.icon} />}
              >
                Generate Key Pair and SignUp
              </Button>
            </div>

          </div>
        )
      }
      <Typography variant="body2">
        Already have an account? <Link to="/signin">Sign In</Link>
      </Typography>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Do you want to Upload Public Key?</DialogTitle>
        <DialogContent className={classes.containerDialog}>
          {
            loading && (
              <Loader />
            )
          }
          {!loading && selectedFile && (
            <div>
              <Typography variant="body1">
                <InsertDriveFileIcon fontSize="large" color="primary" />
                <Box component="span" ml={1}>
                    {selectedFile.name}
                </Box>
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleUploadCert} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SignUp;
