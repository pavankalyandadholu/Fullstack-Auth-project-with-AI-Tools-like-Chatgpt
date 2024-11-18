import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Navbar from '../Components/Navbar';
import ProtectedRoute from '../Components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
