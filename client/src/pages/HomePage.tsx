import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetProducts } from '../store/product';

import { StoreRootState } from '../store';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state: StoreRootState) => state.product
    );

    useEffect(() => {
        dispatch(asyncGetProducts());
    }, [dispatch]);

    return (
        <>
            <Row>
                {loading ? (
                    'Loading...'
                ) : error ? (
                    <h2>{error}</h2>
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
