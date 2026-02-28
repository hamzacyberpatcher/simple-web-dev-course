export let products = [];

export function loadProducts() {
  const promise = fetch('https://supersimplebackend.dev/products').then(response => {
    return response.json();
  }).then((productsData) => {
    products = productsData;
  });

  return promise;
}

export function findProduct(productId) {
  let matchProduct;

  products.forEach(product => {
    if (product.id === productId) matchProduct = product;
  })

  return matchProduct;
}
