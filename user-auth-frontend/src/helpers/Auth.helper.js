import axios from 'axios';

export const isAuthenticated = async () => {
    const token = localStorage.getItem('authToken');
    console.log(token, 'token is')
    if (!token) return false;

    try {
        const response = await axios.get('http://localhost:5000/api/auth/protected', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.status === 200; // Valid token
    } catch (error) {
        return false; // Invalid token
    }
};
