export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function updateQartQuantity() {
    let cartQuantity = 0;

    cart.forEach(cartItem => cartQuantity += cartItem.quantity);

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function addToCart(productid, itemQuantity) {
    let matchingItem;

    cart.forEach(cartItem => {
        if (cartItem.productId === productid)
            matchingItem = cartItem;
    });

    if (matchingItem) {
        matchingItem.quantity += itemQuantity;
    } else {
        cart.push({
            productId: productid,
            quantity: itemQuantity
        });
    }
}
