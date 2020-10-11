import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppRoutes } from '../config';

import { Header } from './Header';
import { Footer } from './Footer';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { UserPage } from '../pages/UserPage';
import { asyncGetProducts } from '../store/productList';

export const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetProducts());
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Header />
                <main className="py-3">
                    <Container>
                        <Switch>
                            <Route
                                exact
                                path={AppRoutes.HOME}
                                component={HomePage}
                            />
                            <Route
                                path={AppRoutes.SIGNIN}
                                component={SignInPage}
                            />
                            <Route
                                path={AppRoutes.SIGNUP}
                                component={SignUpPage}
                            />
                            <Route
                                path={`${AppRoutes.PRODUCT}/:id`}
                                component={ProductPage}
                            />
                            <Route
                                path={`${AppRoutes.CART}/:id`}
                                component={CartPage}
                            />
                            <Route
                                exact
                                path={`${AppRoutes.CART}`}
                                component={CartPage}
                            />
                            <Route
                                path={`${AppRoutes.PROFILE}`}
                                component={UserPage}
                            />
                        </Switch>
                    </Container>
                </main>
                <Footer />
            </Router>
        </div>
    );
};
