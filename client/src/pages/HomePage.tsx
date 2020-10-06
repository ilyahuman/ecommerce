import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import axios, { AxiosPromise } from 'axios';

export const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const response = await axios.get<Product[]>(
            'http://localhost:5000/api/products'
        );

        if (response.data) {
            setProducts(response.data);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <Row>
                {products.map((product: Product) => {
                    return (
                        <Col key={product._id} sm={4}>
                            <ProductCard product={product} />
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};
