import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.133:8800/api",
});

export default instance;
