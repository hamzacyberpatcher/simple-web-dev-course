import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckOut } from './pages/Checkout'
import { Orders } from './pages/Orders'
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
    </>
  )
}

export default App
