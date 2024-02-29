import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.61.173:8800/api",
});

export default instance;
