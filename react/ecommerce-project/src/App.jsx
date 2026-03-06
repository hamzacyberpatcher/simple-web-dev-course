import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckOut } from './pages/Checkout'
import { Orders } from './pages/Orders'
import { Tracking } from './pages/Tracking'
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
    </>
  )
}

export default App
