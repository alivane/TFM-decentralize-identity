import React, { useState } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const useStyles = makeStyles((theme) => ({
  copyButton: {
    // marginLeft: theme.spacing(1),
  },
}));

function CopyText({ text }) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      {`${text.substring(0, 10)}...`}
      <IconButton
        onClick={handleCopy}
        className={classes.copyButton}
        aria-label="copy"
      >
        <FileCopyIcon />
      </IconButton>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Text copied to clipboard"
      />
    </div>
  );
}

export default CopyText;
