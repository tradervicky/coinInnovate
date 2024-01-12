
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Coin from './components/Coin'
import CoinPage from './components/coinPage'
import DashboardContainer from './components/DashboardContainer'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
    <Toaster />
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<DashboardContainer/>}/>
      <Route path='/coins' element={ <CoinPage/>}/>
      <Route path='/coin' element={  <Coin/>}/>
    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
