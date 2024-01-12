import React, { createContext, useContext, useState } from "react";

// Currency context
const CurrencyContext = createContext();
export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("inr");

  const updatedCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, updatedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};

