import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Paginate } from '../components/Paginate';

import { StoreRootState } from '../store';
import { asyncGetProducts } from '../store/productList';
import { useParams } from 'react-router-dom';

export const HomePage = () => {
    const dispatch = useDispatch();
    const { keyword, pageNumber = '1' } = useParams<{
        keyword: string;
        pageNumber: string;
    }>();
    const { loading, error, products, totalCount } = useSelector(
        (state: StoreRootState) => state.products
    );

    useEffect(() => {
        dispatch(asyncGetProducts(pageNumber, keyword));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    <span>{error}</span>
                </Message>
            ) : (
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
                    {/* <Paginate
                        pages={totalCount}
                        activePage={Number(pageNumber)}
                    /> */}
                </>
            )}
        </>
    );
};
