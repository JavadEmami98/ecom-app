import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/shop/wp-json/wc/v3",
  auth: {
    username: "javademami77",
    password: "pass1234",
  },
});

export default api;
