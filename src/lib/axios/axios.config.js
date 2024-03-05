import axios from "axios";

export const Instance = axios.create({
  withCredentials: false,
  baseURL: "http://127.0.0.1:5001",
});
