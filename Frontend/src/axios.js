import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://text-bkzz-nlz3ry946-vikashchands-projects.vercel.app', // Replace with your backend URL
});

export default instance;
