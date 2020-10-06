import React from 'react';
import { ListGroup, Row, Col, Image } from 'react-bootstrap';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Rating } from '../components/Rating';
import { products } from '../products';
import { Product } from '../types';

interface ProductPageParams {
    id: string;
}

export const ProductPage = () => {
    const { id } = useParams<ProductPageParams>();
    const history = useHistory();
    const product = products.find((product: Product) => product._id === id);

    if (!product) {
        return <Redirect to="/" />;
    }

    const { price, name, rating, numReviews, description, image } = product;

    return (
        <>
            <Row>
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
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};
