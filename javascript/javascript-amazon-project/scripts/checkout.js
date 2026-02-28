import * as CartModule from '../data/cart.js'
import * as ProductsModule from '../data/products.js'
import deliveryOptions from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

async function loadPage() {
    await ProductsModule.loadProducts();
    renderCheckoutPage();
}

loadPage();

function updateCheckoutQuantity() {
    document.querySelector('.js-checkout-quantity').innerHTML = `${CartModule.cartQuantity()} items`;
    document.querySelector('.js-payment-order-quantity').innerHTML = `Items (${CartModule.cartQuantity()}):`
}

function deliveryOptionsHtml(cartItem, productId) {
    let html = '';
    const today = dayjs();

    deliveryOptions.forEach(option => {
        const deliveryDate = today.add(option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const shippingText = option.id === '1' ? 'FREE' : `$${option.priceCents / 100} - `;
        const isChecked = cartItem.deliveryOptionId === option.id ? true : false;
        html += `
        <div class="delivery-option js-delivery-option"
        data-product-id=${productId}
        data-delivery-option-id=${option.id}>
        <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${productId}">
        <div>
            <div class="delivery-option-date">
            ${dateString}
            </div>
            <div class="delivery-option-price">
            ${shippingText} Shipping
            </div>
        </div>
        </div>
        `;
    });

    return html;
}

function totalShippingCost() {
    let totalCost = 0;
    CartModule.cart.forEach(cartItem => {
        deliveryOptions.forEach(option => {
            if (option.id === cartItem.deliveryOptionId)
                totalCost += option.priceCents;
        });
    });

    return totalCost;
}

function totalItemCosts() {
    let totalCost = 0;
    CartModule.cart.forEach(cartItem => {
        ProductsModule.products.forEach(product => {
            if (cartItem.productId === product.id)
                totalCost += (product.priceCents * cartItem.quantity);
        });
    });
    return totalCost;
}

function renderPaymentSummary() {
    const itemsTotal = totalItemCosts();
    const shippingTotal = totalShippingCost();
    const total = itemsTotal + shippingTotal;
    const tax = total * 0.1;
    const net = tax + total;

    let paymentSummaryHtml = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-order-quantity">Items (${CartModule.cartQuantity()}):</div>
            <div class="payment-summary-money">$${(itemsTotal / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingTotal / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(net / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}

function renderCheckoutPage() {
    let orderSummaryHtml = '';

    const today = dayjs();

    CartModule.cart.forEach(cartItem => {
        const { productId, quantity } = cartItem;

        const cartProduct = ProductsModule.findProduct(productId);

        let deliveryOption;

        deliveryOptions.forEach(option => {
            if (option.id === cartItem.deliveryOptionId) deliveryOption = option;
        });

        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const deliveryString = deliveryDate.format('dddd, MMMM D');

        const orderSummary = `
        <div class="cart-item-container js-cart-item-container-${productId}">
                <div class="delivery-date">
                Delivery date: ${deliveryString}
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
                        Quantity: <span class="quantity-label js-quantity-label-${productId}">${quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-link-update js-link-update-${productId}" data-product-id=${productId}>
                        Update
                    </span>
                    <div class="update-quantity-inputs not-editing js-update-quantity-inputs-${productId}">
                        <input class="js-input-new-quantity-${productId}" type="number" style="width:50px">
                        <span class="update-quantity-link link-primary js-link-save" data-product-id=${productId}>Save</span>
                    </div>
                    <span class="delete-quantity-link link-primary js-link-delete" data-product-id=${productId}>
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    
                    ${deliveryOptionsHtml(cartItem, productId)}
                    
                </div>
                </div>
        </div>
        
    `;

        orderSummaryHtml += orderSummary;
    });

    renderPaymentSummary();

    document.querySelector('.js-order-summary').innerHTML = orderSummaryHtml;

    document.querySelectorAll('.js-link-delete').forEach(elem => {
        elem.addEventListener('click', () => {
            const { productId } = elem.dataset;

            let index = CartModule.cart.findIndex(item => item.productId === productId);

            if (index != -1) {
                CartModule.cart.splice(index, 1);
            }

            CartModule.saveCart();

            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            updateCheckoutQuantity();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-link-update').forEach(elem => {
        elem.addEventListener('click', () => {
            const { productId } = elem.dataset;
            document.querySelector(`.js-update-quantity-inputs-${productId}`).classList.remove('not-editing');
            elem.classList.add('not-editing');
            document.querySelector(`.js-quantity-label-${productId}`).classList.add('not-editing');
        });
    });

    document.querySelectorAll('.js-link-save').forEach(elem => {
        elem.addEventListener('click', () => {
            const { productId } = elem.dataset;
            let newQuantity = Number(document.querySelector(`.js-input-new-quantity-${productId}`).value);

            if (newQuantity <= 0) return;

            document.querySelector(`.js-link-update-${productId}`).classList.remove('not-editing');
            document.querySelector(`.js-update-quantity-inputs-${productId}`).classList.add('not-editing');
            document.querySelector(`.js-quantity-label-${productId}`).classList.remove('not-editing');

            document.querySelector(`.js-quantity-label-${productId}`).classList.remove('not-editing');
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;


            CartModule.cart.forEach(cartItem => {
                if (cartItem.productId === productId) cartItem.quantity = newQuantity;
            });

            updateCheckoutQuantity();
            renderPaymentSummary();

            CartModule.saveCart();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach(elem => {
        elem.addEventListener('click', () => {
            const { productId, deliveryOptionId } = elem.dataset;
            CartModule.updateDeliveryOption(productId, deliveryOptionId);
            renderCheckoutPage();
        });
    });


    updateCheckoutQuantity();
}
