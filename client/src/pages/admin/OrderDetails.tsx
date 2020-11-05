import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { asyncGetOrder } from '../../store/order';
import { CartProduct, Order } from '../../types';
import { StoreRootState } from '../../store';

import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    Table,
    Button,
} from 'react-bootstrap';

import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { AppRoutes } from '../../config';
import { GoBack } from '../../components/GoBack';
import { useFetch } from '../../hooks/useFetch';
import { OrderService } from '../../services/orderService';

export const OrderDetails = () => {
    const dispatch = useDispatch();
    const { request, response, loading, error } = useFetch();
    const {
        request: requestDelivery,
        response: responseDelivery,
        loading: loadingDelivery,
        error: errorDelivery,
    } = useFetch();
    const { id: orderId } = useParams<{ id: string }>();
    const [currentOrder, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        request(() => OrderService.getOrderDetails(orderId));
    }, []);

    useEffect(() => {
        setOrder(response);
    }, [response]);

    useEffect(() => {
        setOrder(responseDelivery);
    }, [responseDelivery]);

    const onDeliveryHandler = () => {
        requestDelivery(() => OrderService.orderDeliver(orderId));
    };

    if (!currentOrder) {
        return null;
    }

    if (!currentOrder && loading) {
        return <Loader />;
    }

    const { shippingAddress } = currentOrder;

    return (
        <>
            <GoBack />
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
                                    {currentOrder.user.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    {currentOrder.user.email}
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
                                {currentOrder.isPaid &&
                                    !currentOrder.isDelivered && (
                                        <ListGroup.Item>
                                            <Button onClick={onDeliveryHandler}>
                                                Deliver
                                            </Button>
                                        </ListGroup.Item>
                                    )}
                                {!currentOrder.isPaid && (
                                    <Message variant="danger">
                                        Not paid yet
                                    </Message>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};
