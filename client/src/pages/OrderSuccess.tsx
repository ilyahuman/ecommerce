import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { orderClearLast } from '../store/order';
import { StoreRootState } from '../store';
import { AppRoutes } from '../config';

export const OrderSuccess = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser } = useSelector((state: StoreRootState) => state.user);
    const { currentOrder } = useSelector(
        (state: StoreRootState) => state.order
    );

    useEffect(() => {
        return () => {
            dispatch(orderClearLast());
        };
    }, []);

    if (!currentOrder) {
        history.push(AppRoutes.HOME);

        return null;
    }

    return (
        <>
            <ListGroup>
                <ListGroup.Item variant="success">
                    Thank you {currentUser.name} for your purchase! Order ID#{' '}
                    {currentOrder._id}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to={`${AppRoutes.ORDER_DETAILS}/${currentOrder._id}`}>
                        Go to Order Details Page{' '}
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};
