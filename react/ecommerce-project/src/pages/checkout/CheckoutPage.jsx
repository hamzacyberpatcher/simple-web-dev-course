import { CheckoutPageHeader } from './CheckoutPageHeader';
import './CheckoutPage.css'
import CartFavicon from '../../assets/cart-favicon.png'
import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { useState, useEffect } from 'react';
import { PaymentSummary } from './PaymentSummary';

export function CheckOutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const getDeliveryData = async () => {
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
        }

        const getPaymentSummaryData = async () => {
            const response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        }

        getPaymentSummaryData();
        getDeliveryData();
    }, []);


    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href={CartFavicon} />

            <CheckoutPageHeader cart ={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">

                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

                    {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} />}


                </div>
            </div>
        </>
    );
}