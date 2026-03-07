import { Product } from "./Product";

export function ProductGrids({ products, loadCart }) {
    return (
        <div className="home-page">
            <div className="products-grid">

                {products.map(product => {
                    return (
                        <Product key={product.id} product={product} loadCart={loadCart} />
                        
                    );
                })}
            </div>
        </div>
    );
}