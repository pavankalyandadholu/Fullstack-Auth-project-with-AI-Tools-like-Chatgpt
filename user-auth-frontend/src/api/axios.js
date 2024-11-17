import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors for request
axiosInstance.interceptors.request.use(
    (config) => {
        // Example: Attach a token to the header
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptors for response
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here, like logging out users on 401 errors
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
