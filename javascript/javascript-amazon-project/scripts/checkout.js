import * as CartModule from '../data/cart.js'
import * as ProductsModule from '../data/products.js'

let orderSummaryHtml = '';

function updateCheckoutQuantity() {
    document.querySelector('.js-checkout-quantity').innerHTML = `${CartModule.cartQuantity()} items`;
}

CartModule.cart.forEach(cartItem => {
    const {productId, quantity} = cartItem;

    const cartProduct = ProductsModule.findProduct(productId);

    const orderSummary = `
        <div class="cart-item-container">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${cartProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${cartProduct.name}
                    </div>
                    <div class="product-price">
                    $${cartProduct.priceCents / 100}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
        
    `;

    orderSummaryHtml += orderSummary;
});

document.querySelector('.js-order-summary').innerHTML = orderSummaryHtml;

updateCheckoutQuantity();