import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
function LineChart() {
    const [completeData, setCompleteData] =useState([]);
    // const [chartPrice, setChartPrice] = useState({
    //     labels: completeData.prices.map((data)=>data),
    //     datasets: []
    // })
    const chartURL ="https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=max"
    
    
    const fetchChart = async ()=>{
        const response = await axios?.get(chartURL)
        setCompleteData(response?.data)
    }
    useEffect(()=>{
        fetchChart()
    },[])
    console.log(completeData)
    
  return (
    <div>
       {/* <Line
        options={chartPrice.prices}
        data={}
       
       /> */}
    </div>
  )
}

export default LineChart