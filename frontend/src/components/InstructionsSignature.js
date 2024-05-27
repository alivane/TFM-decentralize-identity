// Instruction.js

import React, { useState } from 'react';
import { Box, Typography, TextField, Snackbar,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Link
 } from '@mui/material';
// import { } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CopyText from './CopyText';


const Instruction = () => {
  const [open, setOpen] = useState(false);
  const [privateFileName, setPrivateFileName] = useState('PRIVATE_FILE_NAME.pem');
  const [expidFileName, setExpidFileName] = useState('EXPID_file_challenge.expid');
  const [outputFileName, setOutputFileName] = useState('signature_output.signed');

  // const handleCopy = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* <Typography variant="h6" gutterBottom>
        Instructions
      </Typography> */}
      <Typography variant="body1" paragraph>
        Make sure to use the private key corresponding to your public key. Here is an example using OpenSSL:
      </Typography>
      <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', mb: 2 }}>
        <CopyText text={`openssl dgst -sha256 -sign ${privateFileName} -out ${outputFileName} ${expidFileName}`} />
      </Typography>
      <Typography variant="body1" paragraph>
        Remember to replace <strong>PRIVATE_FILE_NAME.pem</strong> with the path to your private key and <strong>EXPID_file_challenge.expid</strong> with the file you need to sign. UPLOAD THE <strong>signature_output.signed</strong> FILE GENERATED.
      </Typography>
      
      <TextField
        label="Private File Name"
        value={privateFileName}
        onChange={(e) => setPrivateFileName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Singned output File Name"
        value={outputFileName}
        onChange={(e) => setOutputFileName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="EXPID File Challenge Name"
        value={expidFileName}
        onChange={(e) => setExpidFileName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Instructions copied to clipboard!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};



// export default Instruction;


// LinkDialog.js


// import Instruction from './Instruction';

const LinkDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link onClick={handleOpen} color="primary" underline="hover" sx={{ cursor: 'pointer' }}>
        How to make the signature?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Instructions</DialogTitle>
        <DialogContent>
          <Instruction />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LinkDialog;
