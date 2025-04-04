import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // For displaying success/error messages
    const navigate = useNavigate(); // ✅ Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        const apiUrl = "http://127.0.0.1:8000/api/account/forgot-password/"; // Local development URL

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }), // Send the email to the backend
            });

            const data = await response.json(); // Parse the JSON response from the backend

            if (response.ok) {
                setMessage("Link sent to your email to reset password."); // ✅ Keep the success message
                setEmail(""); // ✅ Clear the email input only
            } else {
                const errorMessages = Object.values(data).flat().join(", ");
                setMessage(errorMessages || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            setMessage("An error occurred while processing your request. Please try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-300">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Your Password?</h2>
                
                {/* ✅ Show success/error message */}
                {message && (
                    <div
                        className={`mb-4 p-3 rounded ${
                            message.includes("Link sent") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                    >
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
                    
                    {/* ✅ Button Row: Reset Password & Homepage */}
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