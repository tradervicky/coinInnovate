import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import { fetchCryptoData } from "../config/apiUtils";
import { useCurrency } from "../context/CurrencyContext";
import Card from "./Card";
const DashboardContainer = () => {
  const [crypto, setCrypto] = useState(Array(12).fill(null));
  const [cryptoData, setCryptoData] = useState(null);
  const [input, setInput] = useState("bitcoin")
  const [searchData, setSearchData]= useState({
    name:"Bitcoin",
    price:"20000",
    image:"/assets/bitcoin_logo.png" 
  })
  // cureency converter
const {selectedCurrency} = useCurrency();
const convertPrice = (price) => {
  const parsedPrice = parseFloat(price);

  if (!isNaN(parsedPrice)) {
    switch (selectedCurrency) {
      case "usd":
        return (parsedPrice * 0.012).toFixed(2);
      case "euro":
        return (parsedPrice * 0.011).toFixed(2);
      
      default:
        return parsedPrice.toFixed(2);
    }
  }
};


//end

useEffect(() => {
  const fetchData = async () => {
    try {
      const endpoint = '/coins/markets?vs_currency=inr';
      const data = await fetchCryptoData(endpoint);
      setCryptoData(data);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  fetchData();
}, []);

// from db.json change cryptoData[0] for mapping

// useEffect(()=>{
//   const fetchData = async ()=>{
//     try{
//       const response = await axios.get(" http://localhost:8000/data")
//       setCryptoData(response?.data)
//       console.log(response?.data)
//     }catch(err){
//       console.log(err)
//     }
//   }
//   fetchData()
// },[])

  useEffect(() => {
    const fillData = () => {
      if (cryptoData && cryptoData.length > 0) {
        setCrypto(cryptoData?.slice(0, 12)); 
      }
    };
    fillData();
  }, [cryptoData]);
  useEffect(() => {
    const findCrypto = async () => {
      if (cryptoData && cryptoData.length > 0) {
        const foundData = cryptoData.find((data) => data.name.toLowerCase() === input.toLowerCase());
        if (foundData) {
          setSearchData({
            name: foundData.name,
            price: foundData.current_price,
            image: foundData.image,
          });
        } else {
          setSearchData({
            name: "",
            price: "",
            image: "",
          });
        }
      }
    };

    findCrypto();
  }, [input, cryptoData]);

  return (
    <div className=" flex flex-col gap-4 px-40 pt-10 h-[87vh] bg-gradient-to-b from-transparent to-blue-50">
    <div className="flex gap-5">
        
      <div className="border  w-2/3 rounded-md shadow-md pt-8 pb-4 pl-8">
      <div><span className="bg-purple-100 px-4 rounded-lg text-purple-800 font-semibold">Invest in Crypto</span></div>
        <h2 className="text-3xl font-bold w-[80%] tracking-wide mb-4 text-blue-900">Empowering Tomorrow, One Blockchain at a Time</h2>
        <span className="text-lg font-medium text-gray-500">
          Innovating the Future of Finance with Cryptocurrency Solutions.
        </span>

        <div>
          <ul className="flex flex-col gap-5 mt-4">
            <li className="flex items-center gap-2">
            <HiArrowCircleRight size={24} className="text-blue-500"/>
              Unleashing Digital Potential, One Crypto Transaction at a Time.
            </li>
            <li className="flex items-center gap-2"><HiArrowCircleRight size={24} className="text-blue-500"/>
              Navigating the Future: Your Guide to Cryptocurrency Success.
            </li>
            <li className="flex items-center gap-2"><HiArrowCircleRight size={24} className="text-blue-500"/>
              Cryptocurrency Evolution: Transforming Visions into Transactions.
            </li>
            <li className="flex items-center gap-2"><HiArrowCircleRight size={24} className="text-blue-500"/>
              Decoding Complexity, Elevating Simplicity - Your Crypto Journey
              Starts Here.
            </li>
          </ul>
        </div>
      </div>
      <div className="border  w-1/3 rounded-md shadow-md flex flex-col items-center gap-5 p-5">
        <span className="text-xl font-medium text-blue-900 ">Search Coin</span>
        <input type="text" onChange={(e)=>setInput(e.target.value)} placeholder="enter Crypto coin" className="bg-blue-50 px-4 py-2 outline-none rounded-lg border-gray-500 w-[80%]"/>
        <button className="bg-blue-500 text-white text-xl font-medium px-4 py-2 rounded-lg w-[80%] transition ease-in-out duration-300 hover:bg-blue-300 hover:text-black">Search</button>
       <Card price={convertPrice(searchData.price)} selectedCurrency={selectedCurrency} image={searchData.image} name={searchData.name}/>  

      </div>
     
    </div>
    <div className="border p-4 shadow-lg h-48 flex">
      {/* 12 card banana hai */}
      { crypto &&
        crypto?.map((data, index)=>
       
        <Card key={index} image={data?.image} name={data?.name} selectedCurrency={selectedCurrency} price= {convertPrice(data?.current_price)}/>
        
        )
      }

     
   
    </div>
    </div>
  );
};

export default DashboardContainer;

