import { useState } from "react";
<<<<<<< HEAD

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); // For displaying success/error messages

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        // **IMPORTANT:**  Replace this with your actual backend API endpoint
        const apiUrl = "/api/forgot-password"; // Example API endpoint

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
                // Success: Display a success message as popup and clear the input
                window.alert("Link sent to your email to reset password");
                setEmail(""); // Clear the email input
                setMessage(""); // clear the message as it not needed
            } else {
                // Error: Display an error message
                setMessage(data.error || "An error occurred. Please try again."); // Use data.error if available
            }
        } catch (error) {
            console.error("Forgot Password Error:", error);
            setMessage(
                "An error occurred while processing your request. Please try again later."
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Forgot Your Password?
                </h2>
                {message && (
                    <div
                        className={`mb-4 p-3 rounded ${
                            message.startsWith("An error")
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
=======
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
>>>>>>> a775301a (Updated frontend with latest changes)
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
<<<<<<< HEAD
                    <div className="flex items-center justify-between">
=======
                    
                    <div className="flex justify-between items-center">
>>>>>>> a775301a (Updated frontend with latest changes)
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Reset Password
                        </button>
<<<<<<< HEAD
=======
                        <button 
                            type="button" 
                            onClick={() => navigate("/")} 
                            className="text-red-600 hover:underline text-sm"
                        >
                            Go to Homepage
                        </button>
>>>>>>> a775301a (Updated frontend with latest changes)
                    </div>
                </form>
            </div>
        </div>
    );
}
