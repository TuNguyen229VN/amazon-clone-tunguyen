import axios from "axios";

const instance = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL: "http://127.0.0.1:5001/clone-b2027/us-central1/api",
});

export default instance;
