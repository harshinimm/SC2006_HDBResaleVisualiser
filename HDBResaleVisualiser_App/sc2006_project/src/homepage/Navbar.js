import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, username, handleLogout, handleLoginOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        🏠 HDB Resale Compare
      </h1>
      
      <div className="space-x-6 flex items-center">
        {/* ✅ Ensure all links work correctly */}
        <Link to="/" className="hover:text-gray-200 transition">Home</Link>
        <Link to="/map-selection" className="hover:text-gray-200 transition">Compare Prices</Link>
        <Link to="/map" className="hover:text-gray-200 transition">Map View</Link>
        <Link to="/insights" className="hover:text-gray-200 transition font-bold">Insights & Trends</Link> {/* ✅ Insights Added */}

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-red-600 px-4 py-2 rounded-lg flex items-center"
            >
              {username} ▼
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-red-600 shadow-md rounded-lg">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }} 
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleLoginOpen} className="bg-white text-red-600 px-4 py-2 rounded-lg">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
