import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

import { products } from '../products';

export const HomePage = () => {
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
