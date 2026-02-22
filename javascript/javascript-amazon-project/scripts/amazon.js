import * as CartModule from '../data/cart.js'
import {products} from '../data/products.js'

let productsHtml = '';
const addedMessageTimeouts = {};

products.forEach(product => {
    let productHtml = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${product.priceCents / 100}
            </div>

            <div class="product-quantity-container">
                <select class='js-quantity-selector-${product.id}'>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-productId = ${product.id}>
                Add to Cart
            </button>
            </div>
    `;
    productsHtml += productHtml;
});

const productGridHtml = document.querySelector('.js-product-grid');
productGridHtml.innerHTML = productsHtml;

document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const {productid} = button.dataset;

        const itemQuantity = Number(document.querySelector(`.js-quantity-selector-${productid}`).value);
        
        CartModule.addToCart(productid, itemQuantity);

        CartModule.updateQartQuantity();

        const addedToCartElem = document.querySelector(`.js-added-to-cart-${productid}`);
        addedToCartElem.classList.add('added-to-cart-confirm');

        const previousTimeout = addedMessageTimeouts[productid];

        if (previousTimeout) {
            clearTimeout(previousTimeout);
        }

        const timeoutId = setTimeout(() => {
            addedToCartElem.classList.remove('added-to-cart-confirm')
        }, 1000)

        addedMessageTimeouts[productid] = timeoutId;

        localStorage.setItem('cart', JSON.stringify(cart));
    })
});

CartModule.updateQartQuantity();