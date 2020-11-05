import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, Link, useHistory } from 'react-router-dom';

import { asyncAddCartProduct, asyncRemoveCartProduct } from '../store/cart';
import { asyncSignIn, asyncGetUser } from '../store/user';
import { CartProduct } from '../types';
import { StoreRootState } from '../store';

import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from 'react-bootstrap';

import { Message } from '../components/Message';
import { AppRoutes } from '../config';
import { makeArrayFromInt } from '../utils/makeArrayFromInt';

function getProductTotalCount(products: CartProduct[]): number {
    return products.reduce((acc, product: CartProduct) => acc + product.qty, 0);
}

function getProductTotalPrice(products: CartProduct[]): string {
    return products
        .reduce(
            (acc, product: CartProduct) => acc + product.qty * product.price,
            0
        )
        .toFixed(2);
}

export const CartPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { search } = useLocation<{ qty: string }>();
    const qty: number = parseInt(search.split('=')[1]);
    const { isSignedIn } = useSelector((state: StoreRootState) => state.user);

    const { cartItems } = useSelector((state: StoreRootState) => state.cart);

    useEffect(() => {
        if (id && qty) {
            dispatch(asyncAddCartProduct(id, qty));
        }
    }, [dispatch, id, qty]);

    const onCheckoutHandler = () => {
        const route = isSignedIn
            ? AppRoutes.SHIPPING
            : `${AppRoutes.SIGNIN}?redirect=shipping`;
        history.push(route);
    };

    return (
        <div>
            {!cartItems.length ? (
                <Message>
                    <span>Cart is empty</span>
                </Message>
            ) : (
                <Row>
                    <Col sm={8}>
                        <ListGroup variant="flush">
                            {cartItems.map((product: CartProduct) => {
                                return (
                                    <ListGroup.Item key={product._id}>
                                        <Row>
                                            <Col sm={3}>
                                                <Image
                                                    fluid
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                            </Col>
                                            <Col sm={3}>
                                                <Link
                                                    to={`${AppRoutes.PRODUCT}/${product._id}`}
                                                >
                                                    {product.name}
                                                </Link>
                                            </Col>
                                            <Col sm={2}>{product.price}</Col>
                                            <Col sm={2}>
                                                <Form.Control
                                                    as="select"
                                                    value={product.qty}
                                                    onChange={(event) =>
                                                        dispatch(
                                                            asyncAddCartProduct(
                                                                product._id,
                                                                parseInt(
                                                                    event.target
                                                                        .value
                                                                )
                                                            )
                                                        )
                                                    }
                                                >
                                                    {makeArrayFromInt(
                                                        product.countInStock
                                                    ).map(
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
                                            </Col>
                                            <Col sm={2}>
                                                <Button
                                                    variant="light"
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(
                                                            asyncRemoveCartProduct(
                                                                product._id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Col>
                    <Col sm={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Subtotal {getProductTotalCount(cartItems)}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Total price{' $'}
                                    {getProductTotalPrice(cartItems)}
                                </Card.Subtitle>
                                <Button
                                    onClick={onCheckoutHandler}
                                    variant="secondary"
                                    size="lg"
                                    block
                                >
                                    Proceed to checkout
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
};
