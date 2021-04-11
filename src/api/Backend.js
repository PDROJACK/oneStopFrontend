import axios from "axios";

export default axios.create({
  baseURL: "http://onestop.kalkayan.io/v1",
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  responseEncoding: 'utf8'
});
