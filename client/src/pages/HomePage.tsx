import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import { StoreRootState } from '../store';

export const HomePage = () => {
    const { loading, error, products } = useSelector(
        (state: StoreRootState) => state.products
    );

    return (
        <>
            <Row>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">
                        <span>{error}</span>
                    </Message>
                ) : (
                    products.map((product: Product) => {
                        return (
                            <Col key={product._id} sm={4}>
                                <ProductCard product={product} />
                            </Col>
                        );
                    })
                )}
            </Row>
        </>
    );
};
