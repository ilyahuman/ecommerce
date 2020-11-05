import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Rating } from '../components/Rating';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import { StoreRootState } from '../store';
import { Product, ProductReview, ProductReviewRequest } from '../types';
import { ProductService } from '../services/productService';
import { useFetch } from '../hooks/useFetch';

interface ProductReviewsProps {
    reviews: ProductReview[];
    createReview: (review: ProductReviewRequest) => void;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
    reviews,
    createReview,
}: ProductReviewsProps) => {
    const { isSignedIn } = useSelector((state: StoreRootState) => state.user);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);

    const onSubmitReviewHandler = (event: React.FormEvent<HTMLFontElement>) => {
        event.preventDefault();
        createReview({
            comment,
            rating,
        });
        setComment('');
        setRating(0);
    };

    return (
        <>
            <Row>
                <Col>
                    <ListGroup variant="flush">
                        {reviews.map((review: ProductReview) => {
                            return (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p
                                        style={{
                                            fontSize: '12px',
                                            margin: '5px 0',
                                        }}
                                    >
                                        {review.createdAt.substring(0, 10)}
                                    </p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            );
                        })}
                        <ListGroup.Item>
                            <h3>Write a comment</h3>
                            {isSignedIn ? (
                                <Form onSubmit={onSubmitReviewHandler}>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={comment}
                                            onChange={(event) =>
                                                setComment(event.target.value)
                                            }
                                            required
                                            placeholder="Enter comment"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            value={rating}
                                            as="select"
                                            onChange={(event) =>
                                                setRating(
                                                    Number(event.target.value)
                                                )
                                            }
                                            custom
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <Message>
                                    <span>Only for authorized users</span>
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};
