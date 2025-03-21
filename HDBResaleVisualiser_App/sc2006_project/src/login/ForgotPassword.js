import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate();

    // ✅ Email format validation function
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email) {
            setMessage("Please enter an email.");
            return;
        }

        if (!isValidEmail(email)) {
            setMessage("Invalid email format. Please enter a valid email.");
            return;
        }

        // ✅ Simulate successful request (Frontend-only)
        setMessage("Check your email for reset instructions!");
        
        // Disable input after submission
        setTimeout(() => {
            setMessage("");
            setEmail("");
        }, 3000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-300">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Your Password?</h2>
                
                {message && (
                    <div className={`mb-4 p-3 rounded ${message.includes("Check your email") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Reset Password
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate("/")} 
                            className="text-red-600 hover:underline text-sm"
                        >
                            Go to Homepage
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
