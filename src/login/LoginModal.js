import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function LoginModal({ isLoginOpen, setIsLoginOpen }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = () => {
        if (username && password) {
            alert(`Welcome, ${username}! You are now logged in.`);
            setIsLoginOpen(false);
        } else {
            alert("Please enter both username and password.");
        }
    };

    // Function to handle navigation to the signup page
    const handleSignupClick = () => {
        setIsLoginOpen(false); // Close login modal
        navigate("/signup"); // Navigate to signup page
    };

    if (!isLoginOpen) return null; // don't render if modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                    Login
                </button>

                <div className="flex justify-between mt-4">
                    <button
                        className="text-red-600 hover:underline"
                        onClick={handleSignupClick} // Use the new function
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => setIsLoginOpen(false)} // close modal when clicking
                        className="text-gray-600 hover:underline"
                    >
                        Continue as Guest
                    </button>
                </div>

                {/* Forgot Password Link */}
                <p className="mt-3 text-center">
                    <a href="/forgot-password" className="text-red-600 hover:underline">
                        Forgot Password?
                    </a>
                </p>
            </div>
        </div>
    );
}
