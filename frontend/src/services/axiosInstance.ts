import axios from "axios";
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const getAuthToken = async () => {
  try {
    const stored = localStorage.getItem("authUser");
    if (!stored) return "";

    const user = JSON.parse(stored);
    const token = user?.token;

    return token ? `Bearer ${token}` : "";
  } catch (err) {
    console.error("Error parsing authUser from localStorage:", err);
    return "";
  }
};

instance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
