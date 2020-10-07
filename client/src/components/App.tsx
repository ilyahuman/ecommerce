import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppRoutes } from '../config';

import { Header } from './Header';
import { Footer } from './Footer';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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
                                path={`${AppRoutes.PRODUCT}/:id`}
                                component={ProductPage}
                            />
                            <Route
                                path={`${AppRoutes.CART}/:id`}
                                component={CartPage}
                            />
                        </Switch>
                    </Container>
                </main>
                <Footer />
            </Router>
        </div>
    );
};
