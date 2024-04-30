import React, { useEffect, useState, useRef } from 'react';
import { Button, 
  Typography, 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "2% auto!important",
    padding: "20px !important",
    width: "100%"
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

function FileUpload(props) {
  const classes = useStyles();

  const {
    triggerProcess,
    setLoading,
    loading,
    iconButton=false,
    binaryFile=false,
    typeFile=".crt",
    titleButton="Upload Public key",
    titleDialog="Do you want to Upload Public Key?",
    setOpenDialog,
    openDialog
  } = props;


  // const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(()=> {
    if (selectedFile) {
      setOpenDialog(true)
    }
  }, [selectedFile]);

  
  const handleDialogClose = () => {
    setSelectedFile(null);
    fileInputRef.current.value = '';
    setOpenDialog(false);
  };

  const handleUploadCert = () => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target.result;
      triggerProcess(result);
      
    };
    if (binaryFile) {
      reader.readAsArrayBuffer(selectedFile);
    } else {
      reader.readAsText(selectedFile);
    }
    setSelectedFile(null);
    fileInputRef.current.value = '';

  };

  return (
    <div>
      <input
        accept={typeFile}
        style={{ display: 'none' }}
        id="contained-button-file"
        // multiple
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
            startIcon={!iconButton ? <CloudUploadIcon className={classes.icon}/> : iconButton}
            size="large"
          >
              {titleButton}
          </Button>
      </label>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{titleDialog}</DialogTitle>
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
    </div>
  );
}

export default FileUpload;
