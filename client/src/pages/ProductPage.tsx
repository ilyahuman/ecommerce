import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Rating } from '../components/Rating';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { ProductReviews } from './ProductReviews';

import { useFetch } from '../hooks/useFetch';
import { ProductService } from '../services/productService';
import { makeArrayFromInt } from '../utils/makeArrayFromInt';
import { Product, ProductReviewRequest } from '../types';

interface ProductPageParams {
    id: string;
}

export const ProductPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams<ProductPageParams>();
    const { request, response, loading, error } = useFetch<Product>();
    const {
        request: reviewRequest,
        response: reviewResponse,
        loading: reviewLoading,
        error: reviewError,
        setIsMounted,
    } = useFetch<Product>();
    const [qtyArray, setQtyArray] = useState<number[]>([]);
    const [qty, setQty] = useState<number>(1);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        request(() => ProductService.getProductById(id));
    }, []);

    useEffect(() => {
        if (response) {
            setProduct(response);
        }
    }, [response]);

    useEffect(() => {
        if (product?.countInStock) {
            setQtyArray(makeArrayFromInt(countInStock));
        }
    }, [product]);

    useEffect(() => {
        if (reviewResponse) {
            setProduct(reviewResponse);
        }

        return () => {
            setIsMounted();
        };
    }, [reviewResponse]);

    const addToCartHandler = (event: any) => {
        event.preventDefault();
        history.push(`/cart/${id}?qty=${qty}`);
    };

    const createReview = (review: ProductReviewRequest) => {
        reviewRequest(() => ProductService.createProductReview(id, review));
    };

    if (!product) {
        return null;
    }

    if (!product && loading) {
        return <Loader />;
    }

    const {
        price,
        name,
        rating,
        numReviews,
        description,
        image,
        countInStock,
        reviews,
    } = product as Product;

    return (
        <>
            <Row>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">
                        <span>{error}</span>
                    </Message>
                ) : (
                    <>
                        <Col sm={6}>
                            <Image src={image} fluid />
                        </Col>
                        <Col sm={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={rating}
                                        text={`${numReviews} reviews`}
                                        reviewsStyle={{ marginLeft: '10px' }}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Price: ${price}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>{description}</ListGroup.Item>
                                {countInStock > 0 ? (
                                    <ListGroup.Item>
                                        <Form.Group>
                                            <Form.Control
                                                as="select"
                                                onChange={(event) =>
                                                    setQty(
                                                        parseInt(
                                                            event.target.value
                                                        )
                                                    )
                                                }
                                            >
                                                {qtyArray.map(
                                                    (
                                                        qty: number
                                                    ): JSX.Element => {
                                                        return (
                                                            <option
                                                                key={qty}
                                                                value={qty}
                                                            >
                                                                {qty}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            onClick={addToCartHandler}
                                        >
                                            Primary
                                        </Button>{' '}
                                    </ListGroup.Item>
                                ) : (
                                    <Message variant="danger">
                                        <span>Out of stock</span>
                                    </Message>
                                )}
                            </ListGroup>
                        </Col>
                        <Col>
                            <ProductReviews
                                reviews={reviews}
                                createReview={createReview}
                            />
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
};
