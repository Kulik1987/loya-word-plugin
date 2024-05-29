import axios from "axios";
// import { API_GATEWAY_DEFAULT } from "../constants/environment";

const instance = axios.create({
  // baseURL: process.env.NODE_ENV === "production" ? API_GATEWAY_DEFAULT : "",
  baseURL: "",
});

export default instance;
