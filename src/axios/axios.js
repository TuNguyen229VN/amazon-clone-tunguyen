import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-stripe-clientid.vercel.app/api",
});

export default instance;
