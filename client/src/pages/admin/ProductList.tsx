import React, { useEffect } from 'react';
import { Button, Table, Image, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';

import { StoreRootState } from '../../store';
import { asyncDeleteProduct } from '../../store/productList';
import { Product } from '../../types';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../../config';
import { asyncGetProducts } from '../../store/productList';

export const ProductList = (props: any) => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(
        (state: StoreRootState) => state.products
    );

    const onDeleteHandler = (id: string) => {
        if (window.confirm('Are you sure?')) {
            dispatch(asyncDeleteProduct(id));
        }
    };

    useEffect(() => {
        dispatch(asyncGetProducts());
    }, [dispatch]);

    return (
        <>
            <Row className="align-items-center mb-3">
                <Col md={8}>
                    <h2>Product List</h2>
                </Col>
                <Col className="text-right" md={4}>
                    <LinkContainer to={`${AppRoutes.ADMIN_PRODUCT_EDIT}`}>
                        <Button>Add Product</Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {products.length === 0 ? (
                <Message variant="danger">There are no products</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: Product, index: number) => {
                            return (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Image
                                            style={{ width: '100px' }}
                                            fluid
                                            src={product.image}
                                        />
                                        {product.name}
                                    </td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <LinkContainer
                                                to={`${AppRoutes.ADMIN_PRODUCT_EDIT}/${product._id}`}
                                            >
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    style={{ color: '#007bff' }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button
                                                size="sm"
                                                variant="light"
                                                style={{ color: '#dc3545' }}
                                                onClick={() =>
                                                    onDeleteHandler(product._id)
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </>
    );
};
