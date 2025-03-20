import { useState } from "react";
<<<<<<< HEAD
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
=======
import { useNavigate } from "react-router-dom";

export default function LoginModal({ isLoginOpen, setIsLoginOpen, setIsLoggedIn, setUsername }) {
    const [username, setUsernameInput] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            setErrorMessage("Please enter both username and password.");
            return;
        }

        // ✅ Simulating a successful login (Fake Auth)
        if (password === "test123") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);
            setIsLoggedIn(true);
            setUsername(username);
            setIsLoginOpen(false);
            navigate("/");
        } else {
            setErrorMessage("Invalid username or password.");
        }
    };

    if (!isLoginOpen) return null;
>>>>>>> a775301a (Updated frontend with latest changes)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
<<<<<<< HEAD
                    onChange={(e) => setUsername(e.target.value)}
=======
                    onChange={(e) => setUsernameInput(e.target.value)}
>>>>>>> a775301a (Updated frontend with latest changes)
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                />
<<<<<<< HEAD
=======
                {errorMessage && (
                    <p className="text-red-600 text-center mb-3">{errorMessage}</p>
                )}
>>>>>>> a775301a (Updated frontend with latest changes)
                <button
                    onClick={handleLogin}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                    Login
                </button>

                <div className="flex justify-between mt-4">
                    <button
                        className="text-red-600 hover:underline"
<<<<<<< HEAD
                        onClick={handleSignupClick} // Use the new function
=======
                        onClick={() => {
                            setIsLoginOpen(false);
                            navigate("/signup"); // Navigate to signup page
                        }}
>>>>>>> a775301a (Updated frontend with latest changes)
                    >
                        Sign Up
                    </button>
                    <button
<<<<<<< HEAD
                        onClick={() => setIsLoginOpen(false)} // close modal when clicking
=======
                        onClick={() => setIsLoginOpen(false)}
>>>>>>> a775301a (Updated frontend with latest changes)
                        className="text-gray-600 hover:underline"
                    >
                        Continue as Guest
                    </button>
                </div>

<<<<<<< HEAD
                {/* Forgot Password Link */}
                <p className="mt-3 text-center">
                    <a href="/forgot-password" className="text-red-600 hover:underline">
                        Forgot Password?
                    </a>
=======
                <p className="mt-3 text-center">
                    <button
                        onClick={() => {
                            setIsLoginOpen(false);
                            navigate("/forgot-password");
                        }}
                        className="text-red-600 hover:underline"
                    >
                        Forgot Password?
                    </button>
>>>>>>> a775301a (Updated frontend with latest changes)
                </p>
            </div>
        </div>
    );
}
