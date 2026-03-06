import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckOut } from './pages/Checkout'
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<CheckOut />} />
    </Routes>
    </>
  )
}

export default App
