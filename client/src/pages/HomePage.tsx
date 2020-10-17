import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import { StoreRootState } from '../store';
import { asyncGetProducts } from '../store/productList';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state: StoreRootState) => state.products
    );

    useEffect(() => {
        dispatch(asyncGetProducts());
    }, [dispatch]);

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
