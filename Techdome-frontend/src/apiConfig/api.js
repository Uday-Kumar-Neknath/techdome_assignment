import axios from "axios";

const axiosNew = axios.create({
    baseURL: "https://techdome-backend.onrender.com/api", // Backend API base URL
    headers: {
        "Content-Type": "application/json",
    },
});
const baseUrl = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
    baseURL: `${baseUrl}`
});

export default axiosNew;

