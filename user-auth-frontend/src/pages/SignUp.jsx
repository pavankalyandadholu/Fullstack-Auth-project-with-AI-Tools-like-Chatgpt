import  { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
            });

            // Show success toast
            toast.success(response.data.message, {
                position: 'top-right',
                autoClose: 3000,
            });

            // Clear the form
            setEmail('');
            setPassword('');
        } catch (error) {
            const errorMessage =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong!';
            // Show error toast
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Signup</h1>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
                onSubmit={handleSignup}
            >
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Signup
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
