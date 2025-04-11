import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import LoginModal from "../login/LoginModal";
import SearchSection from "./SearchSection";
import FeaturesSection from "./FeaturesSection";
import RecentComparisons from "./RecentComparisons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function HomePage() {
    const [search, setSearch] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false); // ✅ Fixed Here
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetchUserProfile();
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            // Update this URL to match your actual endpoint
            const response = await axiosInstance.get("/api/account/user-profile/"); 
            const loggedInUsername = response.data.username;
            setUsername(loggedInUsername);
            localStorage.setItem("username", loggedInUsername);
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
    };

    return (
        <div className="min-h-screen bg-white text-red-900">
            <Navbar
                isLoggedIn={isLoggedIn}
                username={username}
                handleLogout={handleLogout}
                handleLoginOpen={() => setIsLoginOpen(true)}
            />
            <LoginModal
                isLoginOpen={isLoginOpen}
                setIsLoginOpen={setIsLoginOpen}
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
            />

            {/* ✅ Search Section, Recent Comparisons, and Navbar go full width */}
            <div className="w-full">
                <SearchSection search={search} setSearch={setSearch} />
            </div>

            {/* ✅ Centered Feature Buttons ONLY */}
            <div className="max-w-5xl mx-auto px-6">
                <FeaturesSection />
            </div>

            {/* ✅ Recent Comparisons go full width */}
            <div className="w-full">
                <RecentComparisons />
            </div>
        </div>
    );
}
