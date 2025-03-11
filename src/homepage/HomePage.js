import { useState } from "react";
import Navbar from "./Navbar";
import LoginModal from "../login/LoginModal";
import SearchSection from "./SearchSection";
import FeaturesSection from "./FeaturesSection";
import TransactionsTable from "./TransactionsTable";


export default function HomePage() {
  const [search, setSearch] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-white text-red-900">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLoginOpen={() => setIsLoginOpen(true)} />
      <LoginModal 
        isLoginOpen={isLoginOpen} 
        setIsLoginOpen={setIsLoginOpen} 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
      />
      <SearchSection search={search} setSearch={setSearch} />
      <FeaturesSection />
      <TransactionsTable />
    </div>
  );
}
