import React from 'react';
import { Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoutes } from '../config';

import { Header } from './Header';
import Footer from './Footer';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { UserPage } from '../pages/UserPage';
import { ShippingPage } from '../pages/ShippingPage';
import { PaymentPage } from '../pages/PaymentPage';
import { PlaceOrderPage } from '../pages/PlaceOrderPage';
import { OrderSuccess } from '../pages/OrderSuccess';
import { OrderDetails } from '../pages/OrderDetails';

import { asyncGetProducts } from '../store/productList';
import { StoreRootState } from '../store';

// TODO Component Type
interface PrivateRouteProps {
    exact?: boolean;
    component: any;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    ...rest
}: PrivateRouteProps) => {
    const isSignedIn = useSelector(
        (state: StoreRootState) => state.user.isSignedIn
    );

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route
            {...rest}
            render={(props) =>
                isSignedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`${AppRoutes.SIGNIN}`} />
                )
            }
        />
    );
};

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
                                path={`${AppRoutes.CART}`}
                                component={CartPage}
                            />
                            <PrivateRoute
                                path={`${AppRoutes.SHIPPING}`}
                                component={ShippingPage}
                            />
                            <PrivateRoute
                                path={`${AppRoutes.PAYMENT}`}
                                component={PaymentPage}
                            />
                            <PrivateRoute
                                path={`${AppRoutes.PLACE_ORDER}`}
                                component={PlaceOrderPage}
                            />
                            <PrivateRoute
                                path={`${AppRoutes.ORDER_SUCCESS}`}
                                component={OrderSuccess}
                            />
                            <PrivateRoute
                                path={`${AppRoutes.ORDER_DETAILS}/:id`}
                                component={OrderDetails}
                            />
                            <PrivateRoute
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
