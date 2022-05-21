// @ts-ignore
import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL : "https://api.chucknorris.io/jokes/",
  headers: {
    "Content-type": "application/json",
  },
});
export default apiClient;