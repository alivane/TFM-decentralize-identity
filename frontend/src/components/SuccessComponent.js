import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function SuccessComponent({ successMessage, onClose }) {
  return (
    <Collapse in={!!successMessage} sx={{ margin: '10%' }}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle sx={{ textAlign: 'left' }}>Success</AlertTitle>
        <div sx={{ textAlign: 'left' }}>{successMessage}</div>
      </Alert>
    </Collapse>
  );
}

export default SuccessComponent;
