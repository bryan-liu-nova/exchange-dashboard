import axios from 'axios';

const headers =
  process.env.NODE_ENV === 'production'
    ? {}
    : {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "X-API-KEY": process.env.REACT_APP_BITQUERY_API_KEY
    };

// Set config defaults
const instance = axios.create({
  timeout: 10000,
  headers: headers,
});

export default instance;
