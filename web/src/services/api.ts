import type { AxiosInstance } from "axios";
import axios from "axios";

export const api: AxiosInstance = axios.create({
  timeout: 5000,
});
