import { Pagination } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdArrowDropupCircle } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { fetchCryptoData } from '../config/apiUtils';
import { useCurrency } from '../context/CurrencyContext';
const CoinPage = () => {
  const navigate = useNavigate()
  const [cryptoData, setCryptoData] = useState(null);
  const [page, setPage] =useState(1)
 
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
const currencySymbol = (symbol)=>{
  if(symbol==="usd"){
    return("$")
  }
  else if(symbol === "euro"){
    return "€"
  }
  else{
    return "₹"
  }
}


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
  const handleCoin = (id)=>{
    
    
  }
  
   
  return (
    <div className='mb-10 mx-40 mt-10'>
      <table className='min-w-full bg-white border border-gray-300 rounded-md overflow-hidden'>
        <thead>
          <tr>
          
            <th className='py-2 px-4 border-b font-bold uppercase text-sm text-gray-700 text-left'>Coins</th>
            <th className='py-2 px-4 border-b font-bold uppercase text-sm text-gray-700 text-left'>Current Price</th>
            <th className='py-2 px-4 border-b font-bold uppercase text-sm text-gray-700 text-left'>24h Change</th>
            <th className='py-2 px-4 border-b font-bold uppercase text-sm text-gray-700 text-left'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData && cryptoData?.slice(page-1,page+9).map((data, index)=>
          <tr className='bg-gray-100' key={index} onClick={()=>handleCoin(data.id)}>
             
            <td className='py-2 px-4 border-b text-gray-800 text-left flex items-center gap-2 cursor-pointer'>
              <img className='w-10 h-10 rounded-full' src={data?.image} alt="" />
              {data.name}
            </td>
           
            <td className='py-2 px-4 border-b text-gray-800 text-left'>{currencySymbol(selectedCurrency)}{convertPrice(data?.current_price)}</td>
            <td className={`py-2 flex px-4 border-b text-left ${data.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>{data.price_change_percentage_24h < 0 ?  <IoMdArrowDropdownCircle size={24}/>: <IoMdArrowDropupCircle size={24}/> }{data?.price_change_percentage_24h.toFixed(2)}%</td>
            <td className='py-2 px-4 border-b text-gray-800 text-left'>{currencySymbol(selectedCurrency)}{convertPrice(data?.market_cap)}</td>
          </tr>)}
          
          
        </tbody>
      </table>
      <div className="flex justify-center mt-2">
      <Pagination
      count={10}
      color="primary" 
      onChange={(e, value) => setPage(value)}
      />
      </div>
      
    </div>
  );
};

export default CoinPage;

