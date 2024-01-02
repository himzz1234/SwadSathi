import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.175:8800/api",
});

export default instance;
