
import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCryptoData } from '../config/apiUtils';
import { useCurrency } from '../context/CurrencyContext';
import LineChart from './LineChart';
function Coin() {
  const { id } = useParams()
  const {selectedCurrency} = useCurrency();
  const [historicalData, setHistoricalData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState()
  const [marketCap, setMarketCap] = useState()
  const [desc, setDesc] = useState("")
  useEffect(() => {
    const fetchHistoricalData = async (id) => {
      try {
        const endpoint = `/coins/${id}`;
        const data = await fetchCryptoData(endpoint);
        setHistoricalData(data);
        console.log(data)
        setCurrentPrice(data?.market_data?.current_price?.[selectedCurrency])
        setMarketCap(data?.market_data?.market_cap?.[selectedCurrency])
        setDesc(historicalData?.description.en.split('.')[0])
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchHistoricalData(id);
  }, [selectedCurrency]);
  
  const currencySymbol = (symbol)=>{
    if(symbol==="usd"){
      return("$")
    }
    else if(symbol === "eur"){
      return "€"
    }
    else{
      return "₹"
    }
  }

  return (
    <div className='flex mx-40 '>
        <div className="mt-10 flex flex-col gap-4 w-[30%] border-r-2 ">
            <img className='w-40 h-40 mx-auto' src={historicalData.image.large} alt="" />
            <h3 className='text-3xl font-bold text-center'>{historicalData.name}</h3>
            <span className='text-lg font-medium px-5'>{desc}.</span>
            <h4 className='text-xl font-bold px-5'>Rank : {historicalData.market_cap_rank}</h4>
            <h4 className='text-xl font-bold px-5'>Current price:{currencySymbol(selectedCurrency)} {currentPrice}</h4>
<h4 className='text-xl font-bold px-5'>Market Cap:{currencySymbol(selectedCurrency)} {marketCap}</h4>

        </div>
        
        <div className="p-5 mt-10 w-[70%] border-l-1">
            <LineChart idCoin={id} selectedCurrency={selectedCurrency}/>
            
        </div>
    </div>
  )
}

export default Coin