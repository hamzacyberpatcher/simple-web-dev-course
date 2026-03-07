import { Header } from '../../components/Header';
import './HomePage.css'
import HomeFavicon from '../../assets/home-favicon.png'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { ProductGrids } from './ProductsGrid';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        }

        getHomeData();
    }, []);


    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href={HomeFavicon} />

            <Header cart={cart} />

            <ProductGrids products={products} loadCart={loadCart} />
        </>
    );
}