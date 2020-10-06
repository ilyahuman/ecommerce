import React from 'react';
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../../config';

export const Header = (): JSX.Element => {
    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <LinkContainer to={AppRoutes.HOME}>
                        <Navbar.Brand>Ecommerce</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to={AppRoutes.CART}>
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>{' '}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={AppRoutes.LOGIN}>
                                <Nav.Link>
                                    <i className="fas fa-user"></i> Link
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
