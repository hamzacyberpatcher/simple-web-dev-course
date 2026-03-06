import { Header } from '../../components/Header';
import { Link } from 'react-router';
import TrackingFavicon from '../../assets/tracking-favicon.png'
import './TrackingPage.css'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            const response = await axios.get('/api/orders?expand=products');

            const foundOrder = response.data.find(order => {
                return order.id === orderId;
            });

            setOrder(foundOrder);
        }

        getOrder();
    }, [orderId]);

    if (!order) {
        return null;
    }

    const product = order.products.find(product => {
        return product.productId === productId;
    });

    const totalDeliveryTimeMs = product.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    let progress = (timePassedMs / totalDeliveryTimeMs) * 100;

    if (progress > 100) {
        progress = 100;
    }



    return (
        <>
            <Header cart={cart} />
            <title>Tracking</title>
            <link rel="icon" href={TrackingFavicon} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(order.orderTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {product.quantity}
                    </div>

                    <img className="product-image" src={product.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${progress < 33 && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${progress >= 33 && progress < 100 && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${progress === 100 && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div style={{width: `${progress}%`}} className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    );
}