import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-lg font-bold">User Auth App</h1>
                <div>
                    <Link to="/" className="mr-4 hover:underline">
                        Home
                    </Link>
                    <Link to="/login" className="mr-4 hover:underline">
                        Login
                    </Link>
                    <Link to="/signup" className="hover:underline">
                        Signup
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
