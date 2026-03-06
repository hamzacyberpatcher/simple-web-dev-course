import './OrdersPage.css'
import { Header } from '../../components/Header';
import OrdersFavicon from '../../assets/orders-favicon.png'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }

        getOrders();
    }, []);

    return (
        <>

            <Header cart={cart} />
            <title>Orders</title>
            <link rel="icon" href={OrdersFavicon} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} />
            </div>
        </>
    );
}