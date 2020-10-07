import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Rating } from '../components/Rating';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import { asyncGetProduct } from '../store/productDetail';
import { StoreRootState } from '../store';

import { Product } from '../types';

interface ProductPageParams {
    id: string;
}

function makeQtySelect(qty: number): number[] {
    const qtyArray = [];

    for (let i = 1; i <= qty; i++) {
        qtyArray.push(i);
    }

    return [...qtyArray];
}

export const ProductPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [qtyArray, setQtyArray] = useState<number[]>([]);
    const [qty, setQty] = useState<string>();
    const { id } = useParams<ProductPageParams>();
    const { product, loading, error } = useSelector(
        (state: StoreRootState) => state.productDetail
    );

    useEffect(() => {
        dispatch(asyncGetProduct(id));
    }, [dispatch]);

    // @ts-ignore-start
    const {
        price,
        name,
        rating,
        numReviews,
        description,
        image,
        countInStock,
    }: Product = product;
    // @ts-ignore-end

    const addToCartHandler = (event) => {
        event.preventDefault();
        history.push(`/cart/${id}?qty=${qty}`);
    };

    useEffect(() => {
        if (countInStock) {
            setQtyArray(makeQtySelect(countInStock));
            setQty('1');
        }
    }, [countInStock]);

    if (!product) {
        return <Redirect to="/" />;
    }

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
                    <>
                        <Col sm={6}>
                            <Image src={image} fluid />
                        </Col>
                        <Col sm={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={rating}
                                        text={`${numReviews} reviews`}
                                        reviewsStyle={{ marginLeft: '10px' }}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Price: ${price}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>{description}</ListGroup.Item>
                                {countInStock > 0 ? (
                                    <ListGroup.Item>
                                        <Form.Group>
                                            <Form.Control
                                                as="select"
                                                onChange={(event) =>
                                                    setQty(event.target.value)
                                                }
                                            >
                                                {qtyArray.map(
                                                    (
                                                        qty: number
                                                    ): JSX.Element => {
                                                        return (
                                                            <option
                                                                key={qty}
                                                                value={qty}
                                                            >
                                                                {qty}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Form.Control>
                                            <Button
                                                variant="primary"
                                                onClick={addToCartHandler}
                                            >
                                                Primary
                                            </Button>{' '}
                                        </Form.Group>
                                    </ListGroup.Item>
                                ) : (
                                    <Message variant="danger">
                                        <span>Out of stock</span>
                                    </Message>
                                )}
                            </ListGroup>
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
};
