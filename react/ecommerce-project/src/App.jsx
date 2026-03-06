import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckOutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import { NotFoundPage } from './pages/notfound/NotFoundPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data)
    }

    getCartData();


  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="/checkout" element={<CheckOutPage cart={cart} />} />
        <Route path="/orders" element={<OrdersPage cart={cart} />} />
        <Route path="/tracking" element={<TrackingPage cart={cart} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
