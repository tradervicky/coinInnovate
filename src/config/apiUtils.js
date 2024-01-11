// apiUtils.js

import axios from 'axios';

const fetchCryptoData = async (endpoint) => {

  const baseUrl = 'https://api.coingecko.com/api/v3';


 

  try {
    const response = await axios.get(baseUrl+`${endpoint}`);
    return response.data;
  } catch (error) {
    return( console.error(error)
    )
   
  }
};

export { fetchCryptoData };
