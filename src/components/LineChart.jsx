import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
import { fetchCryptoData } from '../config/apiUtils';
import { useCurrency } from '../context/CurrencyContext';

//chart


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//chart end

function LineChart({idCoin,selectedCurrency}) {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(365);
  
  

  useEffect(() => {
    const fetchHistoricalData = async (id) => {
      try {
        const endpoint = `/coins/${id}/market_chart?vs_currency=${selectedCurrency}&days=${days}`;
        const data = await fetchCryptoData(endpoint);
        setHistoricalData(data?.prices);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchHistoricalData(idCoin);
  }, [selectedCurrency]);

  
  const updateChart = (numDays) => {
    setDays(numDays);
  };
  const myData = {
    labels: historicalData.map((data, index) => {
      const date = new Date(data[0]);
      return days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in Past ${days} Days`,
        data: historicalData.map((value) => value[1]),
        borderColor: 'orange',
        borderWidth: 3,
      },
    ],
  };
  

  return (
    <div>
      <Line
      data={myData}
      options={{
        elements: {
          point:{
            radius:1
          }
        }}
      }
      />
   
      <button className='px-4 py-2 bg-orange-600 rounded ml-2 mt-1 text-white font-medium' onClick={() => updateChart(1)}>1 Days</button>
      <button className='px-4 py-2 bg-orange-600 rounded ml-2 mt-1 text-white font-medium' onClick={() => updateChart(30)}>30 Days</button>
      <button className='px-4 py-2 bg-orange-600 rounded ml-2 mt-1 text-white font-medium' onClick={() => updateChart(365)}>1 Year</button>
    </div>
  );
}

export default LineChart;
