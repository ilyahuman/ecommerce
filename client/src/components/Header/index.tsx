import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '../../config';

import { StoreRootState } from '../../store';
import { asyncSignOut } from '../../store/user';
import { useAuth } from '../../hooks/useAuth';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import { SearchBox } from '../SearchBox';

export const Header = (): JSX.Element => {
    const { isSignedIn, user } = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    // const { isSignedIn, currentUser } = useSelector(
    //     (state: StoreRootState) => state.user
    // );
    const { isAdmin } = user;

    // Todo
    const [state, setstate] = useState<string | null>(null);

    const onSignOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(asyncSignOut());
        history.push(AppRoutes.HOME);
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
                        <SearchBox />

                        <Nav className="ml-auto">
                            <LinkContainer to={AppRoutes.CART}>
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>{' '}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>

                            {isAdmin ? (
                                <LinkContainer to={AppRoutes.ADMIN}>
                                    <Nav.Link>Admin</Nav.Link>
                                </LinkContainer>
                            ) : null}

                            {isSignedIn && !isObjectEmpty(user) ? (
                                <NavDropdown
                                    title="Dropdown"
                                    id="basic-nav-dropdown"
                                >
                                    <LinkContainer to={AppRoutes.PROFILE}>
                                        <NavDropdown.Item>
                                            <i className="fas fa-user"></i>{' '}
                                            {user.name}
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={onSignOut}>
                                        Sign Out
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
