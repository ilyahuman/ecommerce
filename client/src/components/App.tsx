import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppRoutes } from '../config';

import { Header } from './Header';
import { Footer } from './Footer';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { Container } from 'react-bootstrap';

export const App: React.FC = (): JSX.Element => {
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
                        </Switch>
                    </Container>
                </main>
                <Footer />
            </Router>
        </div>
    );
};
