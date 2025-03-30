import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const Profile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({
        name: "Test User",
        email: "test@example.com",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulate loading state (mock API call)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);  // Simulating API delay
    }, []);

    // Handle save changes (navigates back to homepage)
    const handleSave = () => {
        alert("Profile updated successfully.");
        navigate("/"); // Navigate to homepage after saving
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="profile-container bg-white text-red-900 flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-4xl font-bold mb-6 text-center">User Profile</h2>

            {error && <p className="text-red-600">{error}</p>}

            <div className="text-center">
                <p className="text-3xl mb-4"><strong>Name:</strong> {userProfile.name}</p>
                <p className="text-3xl mb-4"><strong>Email:</strong> {userProfile.email}</p>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                {/* Link to Forgot Password page */}
                <button
                    onClick={() => navigate("/forgot-password")}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
                >
                    Reset Password
                </button>

                <button
                    onClick={handleSave}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Profile;
