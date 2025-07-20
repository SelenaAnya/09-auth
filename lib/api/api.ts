import axios from "axios";

const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  // baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default nextServer;
