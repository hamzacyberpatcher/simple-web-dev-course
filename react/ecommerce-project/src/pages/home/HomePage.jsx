import { Header } from '../../components/Header';
import './HomePage.css'
import HomeFavicon from '../../assets/home-favicon.png'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { ProductGrids } from './ProductsGrid';

export function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        });
    }, []);


    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href={HomeFavicon} />

            <Header cart={cart} />

            <ProductGrids products={products} />
        </>
    );
}