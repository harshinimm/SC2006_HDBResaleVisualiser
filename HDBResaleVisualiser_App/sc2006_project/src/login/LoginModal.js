import { useState } from "react";
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

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                />
                {errorMessage && (
                    <p className="text-red-600 text-center mb-3">{errorMessage}</p>
                )}
                <button
                    onClick={handleLogin}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                    Login
                </button>

                <div className="flex justify-between mt-4">
                    <button
                        className="text-red-600 hover:underline"
                        onClick={() => {
                            setIsLoginOpen(false);
                            navigate("/signup"); // Navigate to signup page
                        }}
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => setIsLoginOpen(false)}
                        className="text-gray-600 hover:underline"
                    >
                        Continue as Guest
                    </button>
                </div>

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
                </p>
            </div>
        </div>
    );
}
