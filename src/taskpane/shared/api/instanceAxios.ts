import axios from "axios";
// import { API_GATEWAY_DEFAULT } from "../constants/environment";

const instance = axios.create({
  // baseURL: process.env.NODE_ENV === "production" ? API_GATEWAY_DEFAULT : "",
  // baseURL: "http://ec2-13-53-249-255.eu-north-1.compute.amazonaws.com:8080",
  // baseURL: "",
  baseURL:
    process.env.NODE_ENV === "production" ? "http://ec2-13-53-249-255.eu-north-1.compute.amazonaws.com:8080" : "",
});

export default instance;
