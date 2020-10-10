import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../../config';

import { StoreRootState } from '../../store';

export const Header = (): JSX.Element => {
    const { isSignedIn, currentUser } = useSelector(
        (state: StoreRootState) => state.user
    );
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
                            {isSignedIn ? (
                                <NavDropdown title="Dropdown" id="nav-dropdown">
                                    <LinkContainer to={AppRoutes.LOGIN}>
                                        <Nav.Link>
                                            <i className="fas fa-user"></i> User
                                            account Out
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to={AppRoutes.LOGIN}>
                                        <Nav.Link>
                                            <i className="fas fa-user"></i> Sign
                                            Out
                                        </Nav.Link>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to={AppRoutes.LOGIN}>
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
