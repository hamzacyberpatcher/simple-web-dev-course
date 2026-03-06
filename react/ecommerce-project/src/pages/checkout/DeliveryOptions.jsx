import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";

export function DeliveryOptions({ deliveryOptions, cartItem }) {
    return (
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
                        <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId ? 'check' : ''}
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
    );
}