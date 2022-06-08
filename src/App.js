import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import MyNavbar from "./components/MyNavbar"

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from "./pages/profile/Profile";
import ProductList from './pages/products/ProductList';

import { verifyService } from './services/auth.services';
import ProfileEdit from "./pages/profile/ProfileEdit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      await verifyService();
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <MyNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />

        <Route path="/product-list" element={<ProductList/>} />

        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
