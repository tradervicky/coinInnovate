
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { fetchCryptoData } from '../config/apiUtils';
import { useCurrency } from '../context/CurrencyContext';
import LineChart from './LineChart';
function Coin() {



  
  
   
  return (
    <div className='flex mx-40 '>
        <div className="mt-10 flex flex-col gap-4 w-[30%] border-r-2 ">
            <img className='w-40 h-40 mx-auto' src="/assets/bitcoin_logo.png" alt="" />
            <h3 className='text-3xl font-bold text-center'>Bitcoin</h3>
            <span className='text-lg font-medium px-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel alias dolore facilis architecto molestiae dicta saepe. Quod tenetur eius ipsam deserunt repellat rem laboriosam. Veritatis atque explicabo voluptas rerum officia.</span>
            <h4 className='text-xl font-bold px-5'>Rank : 1</h4>
            <h4 className='text-xl font-bold px-5'>Current price : $25000 </h4>
            <h4 className='text-xl font-bold px-5'>market Cap : $25156456585</h4>
        </div>
        
        <div className="p-5 mt-10 w-[70%] border-l-1">
            <LineChart/>
            
        </div>
    </div>
  )
}

export default Coin