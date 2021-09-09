import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
});

export default instance;
