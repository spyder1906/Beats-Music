import axios from 'axios';

export default axios.create({
  // baseURL: 'https://server.ylight.xyz',
  baseURL: 'http://localhost:8000',
  // baseURL: 'https://ylight.glitch.me',
});

