import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const GenerateUrl = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await axios.get('/');
        const urlId = response.data.urlId;
        navigate(`/${urlId}`);
      } catch (error) {
        console.error('Error fetching URL:', error);
      }
    };
    fetchUrl();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GenerateUrl;
