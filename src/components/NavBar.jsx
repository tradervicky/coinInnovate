
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { GrCurrency, GrCursor } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { useLogin } from "../context/LoginContext";
import LoginModal from "./Modal/LoginModal";
const NavBar = () => {
  const navigate= useNavigate();
  const {selectedCurrency, updatedCurrency} = useCurrency();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
 
  const usd = 0.012;
  const eur = 0.011;
  const inr_symbol = " ₹"
  const {loginState, updateLoginState} = useLogin()

 
  const handleCurrencyChange = (e)=>{
    const currency = e.target.value;
    updatedCurrency(currency)
  }

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    updateLoginState(false); 
  };


  useEffect(() => {
    const login = () => {
      const isLoggedIn = localStorage.getItem("login");
      updateLoginState(!!isLoggedIn); 
    };
  
    login();
  }, [loginState]);

  return (
    <div className="flex justify-between py-4 bg-[#f5f9ff] shadow-md items-center px-40">
      <div className=" flex items-center gap-3">
        <img
          className="w-16 h-16 cursor-pointer"
          src="/assets/bitcoin_logo.png
            "
          alt=""
        />
        <h1 className="font-medium text-4xl duration-300 ease-in-out hover:text-indigo-600 cursor-pointer">CoinInnovate</h1>
      </div>
      <div className="flex">
        <ul className="flex gap-10 text-md font-medium ">
          <li className="cursor-pointer transition duration-300 ease-in-out hover:text-indigo-600 " onClick={()=>navigate('/')}>Home</li>
          <li className="cursor-pointer transition duration-300 ease-in-out hover:text-indigo-600" onClick={()=>navigate('/coins')}>Coins</li>
          <li className="cursor-pointer transition duration-300 ease-in-out hover:text-indigo-600" onClick={()=>navigate('/coin')}>Blog</li>
        </ul>
      </div>
      <div className="flex gap-4  items-center">
        <div className="flex items-center">
          <GrCurrency size={35} className="text-indigo-600"/>
          <select
            name=""
            id=""
            value={selectedCurrency}
      onChange={handleCurrencyChange}
            className="bg-transparent outline-none cursor-pointer text-lg font-medium border-blue-500 p-2 "
            style={{ color: "#333", width: "180px" ,     borderBottom:" 2px solid #3F51B5"}}
          >
            
            <option value="inr" className="cursor-pointer">
              INR
            </option>
            <option value="usd" className="cursor-pointer">
              USD
            </option>
            
            <option value="eur" className="cursor-pointer">
              Euro
            </option>
          </select>
        </div>
        {loginState ? (
          <div className="cursor-pointer flex flex-col items-center gap-1 ml-4">
          <Avatar onClick={handleLogout} />
          <p onClick={handleLogout} className="text-md font-semibold text-red-600">Logout</p>
          </div>

        ) : (
          <button
            onClick={handleLoginClick}
            className="border-solid border-2 border-indigo-600 py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white"
          >
            Login
          </button>
        )}

        
      </div>
      {isLoginModalOpen && (
        <LoginModal onClose={closeLoginModal} />
      )}
    </div>
  );
};

export default NavBar;
