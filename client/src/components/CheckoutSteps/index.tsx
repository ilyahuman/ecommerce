import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { StoreRootState } from '../../store';

import { AppRoutes } from '../../config';

interface CheckoutStepsProps {
    step1?: boolean;
    step2?: boolean;
    step3?: boolean;
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
    step1 = false,
    step2 = false,
    step3 = false,
}: CheckoutStepsProps): JSX.Element => {
    return (
        <Nav>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to={AppRoutes.SHIPPING}>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to={AppRoutes.PAYMENT}>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to={AppRoutes.PLACE_ORDER}>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};
