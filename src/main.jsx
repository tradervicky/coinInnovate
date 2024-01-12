import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CurrencyProvider} from './context/CurrencyContext.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrencyProvider>
      <LoginProvider>
    <App />
    </LoginProvider>
    </CurrencyProvider>
  </React.StrictMode>,
)
