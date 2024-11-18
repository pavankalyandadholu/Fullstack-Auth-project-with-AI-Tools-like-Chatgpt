import  { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/Auth.helper';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
   


    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setIsAuthorized(authStatus);
        };
        checkAuth();
    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>; // Show a loading spinner while checking
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
