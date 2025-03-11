import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Signup() { // Remove props
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // For success/error messages
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        // Basic email validation (you can make this stronger)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        // Basic password validation (you can make this stronger)
        if (password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        // **IMPORTANT:** Replace with your actual signup API endpoint
        const apiUrl = "/api/signup";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Simulate successful signup
                setMessage("Signed up successfully!");
                // Redirect to the homepage after a short delay
                setTimeout(() => {
                    navigate("/"); // Redirect to homepage
                }, 1500); // 1.5 seconds
            } else {
                setMessage(data.error || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setMessage(
                "An error occurred while processing your request. Please try again later."
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                {message && (
                    <div
                        className={`mb-4 p-3 rounded ${
                            message === "Signed up successfully!"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {message}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onClick={handleSignup}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                    Sign Up
                </button>

                {/* Remove Login button since it is a separate page */}
            </div>
        </div>
    );
}
