import React, { useEffect } from 'react';
import { Button, Table, Image, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';

import { StoreRootState } from '../../store';
import { asyncGetOrderUserList } from '../../store/order';
import { OrderAdminListItem } from '../../types';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../../config';

export const OrderList = (props: any) => {
    const dispatch = useDispatch();
    const { orderList: orders, loading, error } = useSelector(
        (state: StoreRootState) => state.orderList
    );

    const onDeleteHandler = (id: string) => {
        // if (window.confirm('Are you sure?')) {
        //     dispatch(asyncDeleteProduct(id));
        // }
    };

    useEffect(() => {
        dispatch(asyncGetOrderUserList());
    }, [dispatch]);

    return (
        <>
            <h2>Order List</h2>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {orders.length === 0 ? (
                <Message variant="danger">There are no products</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(
                            (order: OrderAdminListItem, index: number) => {
                                return (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <strong>{order.user.name}</strong>
                                            <br />
                                            {order.user.email}
                                        </td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                <div>
                                                    <i
                                                        className="fas fa-check"
                                                        style={{
                                                            color: 'green',
                                                        }}
                                                    ></i>{' '}
                                                    {order.paidAt.substring(
                                                        0,
                                                        10
                                                    )}
                                                </div>
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
                                                to={`${AppRoutes.ADMIN_ORDER_EDIT}/${order._id}`}
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
