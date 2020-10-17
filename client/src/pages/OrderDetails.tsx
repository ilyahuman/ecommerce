import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { asyncGetOrder, asyncOrderPay, orderPayReset } from '../store/order';
import { CartProduct } from '../types';
import { StoreRootState } from '../store';

import { Row, Col, ListGroup, Image, Card, Table } from 'react-bootstrap';

import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { AppRoutes } from '../config';
import { axiosInstance } from '../services/axiosInstance';

// ! FIX lastOrder can be NULL
export const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id: orderId } = useParams<{ id: string }>();
    const { lastOrder, loading, error } = useSelector(
        (state: StoreRootState) => state.order
    );
    const {
        success: successPay,
        loading: loadingPay,
        error: errorPay,
    } = useSelector((state: StoreRootState) => state.order.orderPay);

    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        dispatch(asyncGetOrder(orderId));
    }, []);

    // ! Need to think about this logic ( Now we have order and orderPay to implement this )
    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axiosInstance.get(
                '/config/paypal'
            );
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };

            document.body.appendChild(script);
        };

        if (lastOrder && successPay) {
            dispatch(orderPayReset());
            dispatch(asyncGetOrder(orderId));
            // @ts-ignore
        } else if (lastOrder && !successPay) {
            // @ts-ignore
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [lastOrder, successPay]);

    const onSuccessHandler = (paymentResult: any) => {
        dispatch(asyncOrderPay(lastOrder?.id as string, paymentResult));
    };

    if (lastOrder === null) {
        return null;
    }

    const { shippingAddress } = lastOrder;

    return (
        <>
            <h1>Order {lastOrder.id}</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">Smth is wrong</Message>
            ) : (
                <Row>
                    <Col sm={9}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4>Shipping</h4>
                                <p>
                                    <strong>Name:</strong>{' '}
                                    {lastOrder.user?.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    {lastOrder.user?.email}
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {shippingAddress.address},{' '}
                                    {shippingAddress.city},{' '}
                                    {shippingAddress.postalCode},{' '}
                                    {shippingAddress.country}
                                </p>
                                {lastOrder.isDelivered ? (
                                    <Message variant="success">
                                        Delivered on {lastOrder.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant="danger">
                                        Not delivered
                                    </Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Payment Method</h4>
                                <p>
                                    <strong>Method: </strong>
                                    {lastOrder.paymentMethod}
                                </p>
                                {lastOrder.isPaid ? (
                                    <Message variant="success">
                                        Paid on {lastOrder.paidAt}
                                    </Message>
                                ) : (
                                    <Message variant="danger">Not paid</Message>
                                )}
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
                                {lastOrder.orderItems.map(
                                    (product: CartProduct, index: number) => {
                                        return (
                                            <tr key={product.id}>
                                                <td>{index + 1}</td>
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
                    <Col sm={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Order Summary</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${lastOrder.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${lastOrder.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${lastOrder.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${lastOrder.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!lastOrder.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={lastOrder.itemsPrice}
                                                onSuccess={onSuccessHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};
