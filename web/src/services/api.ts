import type { AxiosInstance } from "axios";
import axios from "axios";
import { env } from "../env";

export const api: AxiosInstance = axios.create({
  baseURL: env.VITE_BACKEND_URL,
  timeout: 5000,
});
