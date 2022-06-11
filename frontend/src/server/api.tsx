import axios from 'axios';

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Vary": "Accept-Encoding",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: "http://desafiofullstack.zinidtech.com.br/api",
});
export default api;