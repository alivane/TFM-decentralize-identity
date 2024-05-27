import React, { useState } from 'react';
import { Button, Container, Typography, Box, 
  // IconButton 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function FileAttachment(props) {
    const {
      handleSubmission
    } = props;

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Handle file upload logic here
            handleSubmission(selectedFile);
            // console.log('Uploading file:', selectedFile);
            // Reset selected file after upload
            setSelectedFile(null);
        } else {
            console.error('No file selected');
        }
    };

    return (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" p={4} boxShadow={1} borderRadius={8}>
            <Typography variant="h5" gutterBottom>
                Attach a File
            </Typography>
            <input
              accept=".crt"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  size="large"
                >
                    Choose File
                </Button>
            </label>
            <Box mt={2} textAlign="center">
                {selectedFile && (
                  <Typography variant="body1">
                    <InsertDriveFileIcon fontSize="large" color="primary" />
                    <Box component="span" ml={1}>
                        {selectedFile.name}
                    </Box>
                  </Typography>
                )}
            </Box>
            <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  size="large"
                >
                    Upload
                </Button>
            </Box>
        </Box>
      </Container>
    );
}

export default FileAttachment;
