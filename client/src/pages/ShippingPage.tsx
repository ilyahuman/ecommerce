import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../components/FormContainer';
import { CheckoutSteps } from '../components/CheckoutSteps';

import { StoreRootState } from '../store';
import { asyncUpdateUser } from '../store/user';

import { User } from '../types';
import { AppRoutes } from '../config';
import { isObjectFull } from '../utils/isObjectEmpty';

export const ShippingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        currentUser: { shippingAddress },
    } = useSelector((state: StoreRootState) => state.user);

    const [address, setAddress] = useState<string>(shippingAddress.address);
    const [city, setCity] = useState<string>(shippingAddress.city);
    const [postalCode, setPostalCode] = useState<string>(
        shippingAddress.postalCode
    );
    const [country, setCountry] = useState<string>(shippingAddress.country);

    const onSubmitHandler = (event: React.FormEvent<HTMLFontElement>) => {
        event.preventDefault();

        if (!isObjectFull(shippingAddress)) return;

        history.push(AppRoutes.PAYMENT);
    };

    const onUpdateHandler = () => {
        dispatch(
            asyncUpdateUser({
                shippingAddress: {
                    address,
                    city,
                    postalCode,
                    country,
                },
            } as User)
        );
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 />
            <h1>Shipping page</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        placeholder="Enter address"
                        onChange={(event) => setAddress(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        value={city}
                        placeholder="Enter city"
                        onChange={(event) => setCity(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        value={postalCode}
                        placeholder="Enter postal dode"
                        onChange={(event) => setPostalCode(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        value={country}
                        placeholder="Enter country"
                        onChange={(event) => setCountry(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Row className="justify-content-md-between">
                    <Col md={5} lg={5}>
                        <Button type="button" onClick={onUpdateHandler}>
                            Update Shipping address
                        </Button>
                    </Col>
                    <Col md={5} lg={5}>
                        <Button type="submit">Go to payment</Button>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};
