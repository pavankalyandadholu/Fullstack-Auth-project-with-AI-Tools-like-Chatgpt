import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Check if user is logged in by checking for the authToken in localStorage
    const isLoggedIn = !!localStorage.getItem('authToken');

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove token
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="bg-blue-500 px-4 py-2">
            <div className="flex items-center justify-between">
                <div>
                    <Link to="/" className="text-white font-bold text-xl">
                        MyApp
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                <Link to="/home"  className="text-white hover:underline font-medium">
                        Home 
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:underline font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white hover:underline font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                          <Link
                                to="/feed"
                                className="text-white hover:underline font-medium"
                            >   Feed
                            </Link>
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 hover:bg-red-700 font-medium px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                        </>

                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

