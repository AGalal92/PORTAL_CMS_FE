import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api", // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchApi = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params }); // Pass query params here
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.response?.data || error.message);
    throw error; // Rethrow the error to handle it in the caller function
  }
};

export default axiosInstance;
