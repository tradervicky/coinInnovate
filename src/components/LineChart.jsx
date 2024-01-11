import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useCurrency } from '../context/CurrencyContext';

function LineChart() {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useCurrency();

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/prices");
      setHistoricalData(response?.data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.getHours() > 12
      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
      : `${date.getHours()}:${date.getMinutes()} AM`;
  };

  const updateChart = (numDays) => {
    setDays(numDays);
  };

  return (
    <div>
      {historicalData && historicalData?.length > 0 ? (
        <Line
          data={{
            labels: historicalData?.map((coin) => {
              return days === 1 ? formatTime(coin[0]) : new Date(coin[0]).toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalData?.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      ) : (
        <p>Loading or no data available</p>
      )}
      <button onClick={() => updateChart(1)}>24 Hours</button>
      <button onClick={() => updateChart(30)}>30 Days</button>
      <button onClick={() => updateChart(90)}>3 Months</button>
      <button onClick={() => updateChart(365)}>1 Year</button>
    </div>
  );
}

export default LineChart;



// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import { useCurrency } from '../context/CurrencyContext';
// function LineChart() {
//     const [completeData, setCompleteData] =useState([]);
//     // const [chartPrice, setChartPrice] = useState({
//     //     labels: completeData.prices.map((data)=>data),
//     //     datasets: []
//     // })
//     const [historicalData, setHistoricalData] = useState();
//     const [days, setDays] = useState(1)
//    const {currency} = useCurrency();
//    const fetchHistoricalData = async ()=>{
//     const response = await axios.get("http://localhost:8000/prices")
//     setHistoricalData(response?.data)
//    }
//    useEffect(()=>{
//     fetchHistoricalData()
//    },[])

//     // const chartURL ="https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=max"
    
    
//     // const fetchChart = async ()=>{
//     //     const response = await axios?.get(chartURL)
//     //     setCompleteData(response?.data)
//     // }
//     // useEffect(()=>{
//     //     fetchChart()
//     // },[])
//     // console.log(completeData)
//     console.log(historicalData)
//   return (
//     <div>
//        {/* <Line
//        data={{
//         labels: historicalData?.map((coin)=>{
//           let date = new Date(coin[0]);
//           let time = 
//           date.getHours() > 12
//           ? ` ${date?.getHours()-12} : ${date.getMinutes()} PM`
//           :  ` ${date.getHours() } : ${date.getMinutes()} AM`
//           return days === 1 ? time : date.toLocaleDateString

//         }),
//         datasets : [
//          { data: historicalData.map((coin)=>coin[1]),
//           label: `Price (Past ${days} Days) in ${currency}`,
//       borderColor: "#EEBC1D",
//         }
//         ]
//        }}
//        options={
//         {
//           elements: {
//             point: {
//               radius: 1,
//             },
//           },
//         }
//        }
//        /> */}
//        <button>24 Hours</button>
//             <button>30 Days</button>
//             <button>3 Months</button>
//             <button>1 Years</button>
//     </div>
//   )
// }

// export default LineChart