import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FormContainer } from '../components/FormContainer';
import { CheckoutSteps } from '../components/CheckoutSteps';

import { StoreRootState } from '../store';
import { asyncCartAddPaymentMethod } from '../store/cart';

import { isObjectFull } from '../utils/isObjectEmpty';
import { AppRoutes } from '../config';
import { useCheckout } from '../hooks/useCheckout';

interface PaymentMethod {
    name: string;
    label: string;
    value: string;
    id: string;
    isChecked: boolean;
}

export const PaymentPage = () => {
    useCheckout();
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        currentUser: { shippingAddress },
    } = useSelector((state: StoreRootState) => state.user);

    const [paymentMethod, setPaymentMethod] = useState<string>('');

    useEffect(() => {
        if (!isObjectFull(shippingAddress)) {
            history.push(AppRoutes.SHIPPING);
        }
    }, [shippingAddress]);

    const onSubmitHandler = (event: React.FormEvent<HTMLFontElement>) => {
        event.preventDefault();
        dispatch(asyncCartAddPaymentMethod(paymentMethod));
        history.push(AppRoutes.PLACE_ORDER);
    };

    const paymentMethods: PaymentMethod[] = [
        {
            name: 'paymentMethod',
            label: 'PayPal',
            value: 'PayPal',
            id: 'paypal-method',
            isChecked: true,
        },
        {
            name: 'paymentMethod',
            label: 'Stripe',
            value: 'Stripe',
            id: 'stripe-method',
            isChecked: true,
        },
    ];

    useEffect(() => {
        setPaymentMethod(paymentMethods[0].value);
    }, []);

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Payment page</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group>
                    <Form.Label>Payment Methods</Form.Label>
                    {paymentMethods.map((payment: PaymentMethod) => {
                        return (
                            <Form.Check
                                key={payment.id}
                                checked={paymentMethod === payment.value}
                                type="radio"
                                name={payment.name}
                                id={payment.id}
                                label={payment.label}
                                value={payment.value}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setPaymentMethod(event.target.value)}
                            />
                        );
                    })}
                </Form.Group>

                <Button type="submit">Place Order</Button>
            </Form>
        </FormContainer>
    );
};
