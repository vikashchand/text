import axios from 'axios';

const instance = axios.create({
 baseURL: 'https://text-bkzz.vercel.app', // Replace with your backend URL
 //baseURL: 'http://localhost:5000',
});

export default instance;
