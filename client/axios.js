import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.245.168:8800/api",
});

export default instance;
