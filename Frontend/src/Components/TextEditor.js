import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import QRCode from 'qrcode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextEditor = () => {
  const { urlId } = useParams();
  const [content, setContent] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/${urlId}`);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    // Fetch content initially and generate QR code
    fetchContent();
    generateQRCode();

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchContent, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [urlId]);

  const generateQRCode = async () => {
    try {
      const fullUrl = `${window.location.origin}/${urlId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(fullUrl);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const saveContent = async () => {
    try {
      await axios.post(`/${urlId}`, { content });
      toast.success('Content saved successfully!', { autoClose: 1000 });
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error saving content.', { autoClose: 1000 });
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!', { autoClose: 1000 });
  };

  const clearContent = async () => {
    try {
      await axios.delete(`/${urlId}`);
      setContent('');
      toast.success('Content cleared successfully!', { autoClose: 1000 });
    } catch (error) {
      console.error('Error clearing content:', error);
      toast.error('Error clearing content.', { autoClose: 1000 });
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h6" component="h1" gutterBottom>
          Echo-Text 🔊📄
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom>
          Text will be deleted from the database after 1 hour
        </Typography>
        {qrCodeUrl && (
          <Box mb={2} display="flex" justifyContent="center">
            <img src={qrCodeUrl} alt="QR Code" />
          </Box>
        )}
        <Typography variant="h6" component="h2" gutterBottom>
          {window.location.origin}/{urlId}
        </Typography>
        <TextField
          label="Your Text"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={saveContent}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={copyContent}>
            Copy
          </Button>
          <Button variant="contained" onClick={clearContent}>
            Clear
          </Button>
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={1000} // Duration for auto-close
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <Typography variant="h6" component="h3" align="center" mt={2}>
        Made by: Vikash Chand
      </Typography>
    </Container>
  );
};

export default TextEditor;
