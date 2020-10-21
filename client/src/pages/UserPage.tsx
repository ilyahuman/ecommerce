import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { StoreRootState } from '../store';
import { asyncUpdateUser } from '../store/user';
import { Message } from '../components/Message';
import { OrderUserListItem } from '../types';
import { asyncGetUser } from '../store/user/actions';
import { asyncGetOrders } from '../store/order';
import { Loader } from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../config';

export const UserPage = () => {
    const dispatch = useDispatch();
    const { currentUser, isSignedIn } = useSelector(
        (state: StoreRootState) => state.user
    );
    const { orders, loading, error } = useSelector(
        (state: StoreRootState) => state.order
    );

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(asyncGetUser());
        dispatch(asyncGetOrders());
    }, []);

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(
            asyncUpdateUser({
                email,
                name,
                password,
            })
        );

        setPassword('');
    };

    return (
        <>
            <h2>User Info</h2>
            <Row>
                <Col xs={12} sm={12} md={6}>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                type="name"
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                type="email"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                value={password}
                                type="password"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>

            <h2>My Orders</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : orders.length === 0 ? (
                <Message variant="danger">You do not have orders</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(
                            (order: OrderUserListItem, index: number) => {
                                return (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: 'red' }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(
                                                    0,
                                                    10
                                                )
                                            ) : (
                                                <i
                                                    className="fas fa-times"
                                                    style={{ color: 'red' }}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`${AppRoutes.ORDER_DETAILS}/${order._id}`}
                                            >
                                                <Button>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </Table>
            )}
        </>
    );
};
