import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import moduleName from 'react-router';
import { Rating } from '../Rating';

import { Product } from '../../types';

interface ProductProps {
    product: Product;
}

export const ProductCard: React.FunctionComponent<ProductProps> = ({
    product,
}: ProductProps) => {
    const { _id, name, category, price, image, rating, numReviews } = product;

    return (
        <Link to={`/product/${_id}`}>
            <Card className="my-3 p-3 rounded" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{category}</Card.Text>
                    <Card.Text>{price}</Card.Text>
                    <Rating value={rating} text={`${numReviews} reviews`} />
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Link>
    );
};
