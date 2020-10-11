import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../../config';

import { StoreRootState } from '../../store';
import { asyncSignOut } from '../../store/user';

import { isObjectEmpty } from '../../utils/isObjectEmpty';

export const Header = (): JSX.Element => {
    const dispatch = useDispatch();
    const { isSignedIn, currentUser } = useSelector(
        (state: StoreRootState) => state.user
    );

    const onSignOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(asyncSignOut());
    };

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

                            {isSignedIn && !isObjectEmpty(currentUser) ? (
                                <NavDropdown
                                    title="Dropdown"
                                    id="basic-nav-dropdown"
                                >
                                    <LinkContainer to={AppRoutes.PROFILE}>
                                        <NavDropdown.Item>
                                            {currentUser.name}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={AppRoutes.CART}>
                                        <NavDropdown.Item>
                                            <i className="fas fa-user"></i>{' '}
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={onSignOut}>
                                        <i className="fas fa-user"></i> Sign Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to={AppRoutes.SIGNIN}>
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
