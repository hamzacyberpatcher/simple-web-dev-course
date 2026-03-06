import { CheckoutPageHeader } from './CheckoutPage/CheckoutPageHeader';
import './CheckoutPage.css'
import { Link } from 'react-router';
import CartFavicon from '../assets/cart-favicon.png'
import { formatMoney } from '../utils/money';
import axios from 'axios';
import dayjs from 'dayjs'
import { useState, useEffect } from 'react';

export function CheckOutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime')
            .then(response => {
                setDeliveryOptions(response.data);
            })
    }, []);


    return (
        <>
            <title>Checkout</title>
            <link rel="icon" href={CartFavicon} />

            <CheckoutPageHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cart.map(cartItem => {
                            const selecteditem = deliveryOptions.find(deliveryOption => {
                                    return deliveryOption.id === cartItem.deliveryOptionId;
                                });

                            return (
                                <div key={cartItem.product.id} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: {dayjs(selecteditem.estimatedDeliveryTimeMs).format('dddd, D MMMM')}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(cartItem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">2</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>

                                            {deliveryOptions.map(deliveryOption => {
                                                let shippingString = 'FREE Shipping';

                                                if (deliveryOption.priceCents > 0) {
                                                    shippingString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
                                                }

                                                return (
                                                    <div key={deliveryOption.id} className="delivery-option">
                                                        <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId ? 'check': ''}
                                                            className="delivery-option-input"
                                                            name={`delivery-option-${cartItem.product.id}`} />
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, D MMMM')}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {shippingString}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items (3):</div>
                            <div className="payment-summary-money">$42.75</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">$4.99</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">$47.74</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">$4.77</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">$52.51</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}