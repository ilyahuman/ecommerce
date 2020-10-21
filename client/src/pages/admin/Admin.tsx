import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../../config';

import { Dashboard } from './Dashboard';
import { UserList } from './UserList';
import { UserPage } from './UserPage';
import { ProductList } from './ProductList';
import { EditProduct } from './EditProduct';
import { OrderList } from './OrderList';
import { OrderDetails } from './OrderDetails';

import { Provider } from 'react-redux';

interface AdminLinkListItem {
    label: string;
    to: string;
    exact: boolean;
}

const adminLinkList: AdminLinkListItem[] = [
    {
        label: 'Dashboard',
        to: '',
        exact: true,
    },
    {
        label: 'User List',
        to: AppRoutes.ADMIN_USER_LIST,
        exact: false,
    },
    {
        label: 'Product List',
        to: AppRoutes.ADMIN_PRODUCT_LIST,
        exact: false,
    },
    {
        label: 'Order List',
        to: AppRoutes.ADMIN_ORDER_LIST,
        exact: false,
    },
];

export const Admin = () => {
    let match = useRouteMatch();

    return (
        <>
            <Row>
                <Col md={3}>
                    <ListGroup>
                        {adminLinkList.map((link: AdminLinkListItem) => {
                            return (
                                <ListGroup.Item
                                    key={link.label}
                                    style={{ padding: '0' }}
                                    action
                                >
                                    <NavLink
                                        style={{
                                            display: 'block',
                                            fontWeight: 'bold',
                                            padding: '.75rem 1.25rem',
                                        }}
                                        exact={link.exact}
                                        activeStyle={{
                                            fontWeight: 'bold',
                                        }}
                                        to={`${match.url}${link.to}`}
                                    >
                                        <span>{link.label}</span>
                                    </NavLink>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
                <Col md={9}>
                    <Switch>
                        <Route
                            path={`${AppRoutes.ADMIN_PRODUCT_EDIT}/:id`}
                            component={EditProduct}
                        />
                        <Route
                            path={`${AppRoutes.ADMIN_PRODUCT_EDIT}`}
                            component={EditProduct}
                        />
                        <Route
                            exact
                            path={`${match.path}${AppRoutes.ADMIN_PRODUCT_LIST}`}
                            component={ProductList}
                        />
                        <Route
                            path={`${match.path}${AppRoutes.ADMIN_USER_LIST}/:id`}
                            component={UserPage}
                        />
                        <Route
                            exact
                            path={`${match.path}${AppRoutes.ADMIN_USER_LIST}`}
                            component={UserList}
                        />
                        <Route
                            path={`${AppRoutes.ADMIN_ORDER_EDIT}/:id`}
                            component={OrderDetails}
                        />
                        <Route
                            exact
                            path={`${match.path}${AppRoutes.ADMIN_ORDER_LIST}`}
                            component={OrderList}
                        />
                        <Route path={`${match.path}`} component={Dashboard} />
                    </Switch>
                </Col>
            </Row>
        </>
    );
};
