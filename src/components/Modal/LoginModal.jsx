import axios from "axios";
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useLogin } from "../../context/LoginContext";

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
const {loginState, updateLoginState} = useLogin()
  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/1");
      if (
        response.data.username === formData.username &&
        response.data.password === formData.password
      ) {
        toast.success("Login successful!");
        localStorage.setItem("login",  true)
        updateLoginState(true);
        onClose();
      } else {
        toast.error("Incorrect username or password");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login");
    }
  };

  const handleGuestLogin = () => {
    const guestUsername = "guest";
    const guestPassword = "guest";

    setFormData({
      username: guestUsername,
      password: guestPassword,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleLogin}
            className="bg-indigo-600 text-white py-2 px-4 rounded mr-2 hover:bg-indigo-700"
          >
            Login
          </button>
          <button
            onClick={handleGuestLogin}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Guest Login
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-gray-800 py-2 px-4 rounded hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
   
    </div>
  );
};

export default LoginModal;
