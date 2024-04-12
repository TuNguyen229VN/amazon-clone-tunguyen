import axios from "axios";
import { API_STRIPE } from "../constant/constanst";

const instance = axios.create({
  baseURL: API_STRIPE,
});

export default instance;
