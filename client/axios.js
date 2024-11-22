import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.52:8800/api",
});

export default instance;
