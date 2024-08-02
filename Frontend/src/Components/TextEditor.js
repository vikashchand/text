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
    fetchContent();
    generateQRCode();
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
      toast.success('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error saving content.');
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!');
  };

  const clearContent = async () => {
    try {
      await axios.delete(`/${urlId}`);
      toast.success('Content cleared successfully!');
      setContent('');
    } catch (error) {
        toast.error('Error clearing content.');
      console.error('Error clearing content:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Echo-Text 🔊📄
        </Typography>
        <h3 style="text-align: center;">Text will be deleted after 1 hr from databases</h3>

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
      autoClose={100} // Duration for auto-close
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
    />
    <h3>Made by:Vikash Chand</h3>
    </Container>
  );
};

export default TextEditor;
