import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { CartProduct, Order } from '../types';

import { Row, Col, ListGroup, Image, Card, Table } from 'react-bootstrap';

import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { AppRoutes } from '../config';
import { axiosInstance } from '../services/axiosInstance';
import { AppService } from '../services/appService';
import { OrderService } from '../services/orderService';
import { useFetch } from '../hooks/useFetch';

// ! FIX currentOrder can be NULL
export const OrderDetails = () => {
    const { id: orderId } = useParams<{ id: string }>();
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [sdkReady, setSdkReady] = useState(false);
    const { request, response, loading, error } = useFetch<Order>();
    const {
        request: requestPay,
        response: responsePay,
        loading: loadingPay,
        error: errorPay,
        setIsMounted,
    } = useFetch<any>();

    useEffect(() => {
        request(() => OrderService.getOrderDetails(orderId));
    }, []);

    useEffect(() => {
        if (response) {
            setCurrentOrder(response);
        }
    }, [response]);

    useEffect(() => {
        if (responsePay) {
            setCurrentOrder(responsePay);
        }
    }, [responsePay]);

    const onSuccessHandler = (paymentResult: any) => {
        requestPay(() =>
            OrderService.orderPay(currentOrder?._id as string, paymentResult)
        );
    };

    // ! Need to think about this logic ( Now we have order and orderPay to implement this )
    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await AppService.getPayPalId();
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (currentOrder && !responsePay) {
            // @ts-ignore
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [currentOrder]);

    if (!currentOrder) {
        return null;
    }

    if (!currentOrder && loading) {
        return <Loader />;
    }

    const { shippingAddress } = currentOrder;

    return (
        <>
            <h1>Order {currentOrder._id}</h1>
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
                                    {currentOrder.user?.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    {currentOrder.user?.email}
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {shippingAddress.address},{' '}
                                    {shippingAddress.city},{' '}
                                    {shippingAddress.postalCode},{' '}
                                    {shippingAddress.country}
                                </p>
                                {currentOrder.isDelivered ? (
                                    <Message variant="success">
                                        Delivered on {currentOrder.deliveredAt}
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
                                    {currentOrder.paymentMethod}
                                </p>
                                {currentOrder.isPaid ? (
                                    <Message variant="success">
                                        Paid on {currentOrder.paidAt}
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
                                {currentOrder.orderItems.map(
                                    (product: CartProduct, index: number) => {
                                        return (
                                            <tr key={product._id}>
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
                                                        to={`${AppRoutes.PRODUCT}/${product._id}`}
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
                                        <Col>${currentOrder.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${currentOrder.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${currentOrder.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${currentOrder.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!currentOrder.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={currentOrder.itemsPrice}
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
