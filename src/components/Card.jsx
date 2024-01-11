import React from 'react'

const Card = ({image, price, name , selectedCurrency}) => {
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
  return (
    <div className='w-16 h-16 flex flex-col gap-1 p-1 items-center py-5 mx-5'>
        <img src={image} alt="bitcoin" />
        <span className='text-sm font-medium text-blue-800 cursor-pointer'>{name}</span>
        <span className='text-sm font-medium text-gray-600'>{currencySymbol(selectedCurrency)}{price} </span>
    </div>
  )
}

export default Card