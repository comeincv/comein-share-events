import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://comein.cv/comeincv_api_250923",
  timeout: 100000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

export default axiosInstance;
