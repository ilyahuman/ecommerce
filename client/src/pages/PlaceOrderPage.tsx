import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    ListGroup,
    Image,
    Card,
    Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct } from '../types';
import { AppRoutes } from '../config';

import { Message } from '../components/Message';
import { CheckoutSteps } from '../components/CheckoutSteps';

import { useSummary } from '../hooks/useSummary';

import { StoreRootState } from '../store';

export const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        currentUser: { shippingAddress },
    } = useSelector((state: StoreRootState) => state.user);
    const { address, city, country, postalCode } = shippingAddress;
    const { cartItems, paymentMethod } = useSelector(
        (state: StoreRootState) => state.cart
    );

    const [itemsPrice, shippingPrice, taxPrice, totalPrice] = useSummary(
        cartItems
    );

    const onPlaceOrderHandler = () => {};

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <h1>Place Order</h1>
            <Row>
                <Col sm={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p>
                                <strong>Address: </strong>
                                {address}, {city}, {postalCode}, {country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(
                                (product: CartProduct, index: number) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{index}</td>
                                            <td>
                                                <Image
                                                    style={{
                                                        width: '100px',
                                                    }}
                                                    src={product.image}
                                                />
                                            </td>
                                            <td>
                                                <Link
                                                    to={`${AppRoutes.PRODUCT}/${product.id}`}
                                                >
                                                    {product.name}
                                                </Link>
                                            </td>
                                            <td>{product.price}</td>
                                            <td>{product.qty}</td>
                                            <td>
                                                <span>
                                                    {product.qty} x{' '}
                                                    {product.price} = $
                                                    {(
                                                        product.qty *
                                                        product.price
                                                    ).toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </Table>
                </Col>
                <Col sm={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4>Order Summary</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    block
                                    type="button"
                                    onClick={onPlaceOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
