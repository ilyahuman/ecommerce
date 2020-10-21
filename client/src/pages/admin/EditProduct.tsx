import React, { useEffect, useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { useFetch } from '../../hooks/useFetch';
import { ProductEdit, Product } from '../../types';

// Services
import { ProductService } from '../../services/productService';
import { UploadService } from '../../services/uploadService';

import { GoBack } from '../../components/GoBack';

export const EditProduct = () => {
    const [product, setProduct] = useState<ProductEdit>({
        name: '',
        image: '',
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
    });
    const { request, response, loading, error } = useFetch<Product>();
    const {
        request: uploadRequest,
        response: uploadResponse,
        loading: uploadLoading,
        error: uploadError,
    } = useFetch<any>();
    const { id: productId } = useParams<{ id: string }>();

    useEffect(() => {
        if (productId) {
            request(() => ProductService.getProductById(productId));
        }
    }, []);

    useEffect(() => {
        if (uploadResponse) {
            debugger;
            setProduct({
                ...product,
                image: uploadResponse,
            });
        }
    }, [uploadResponse]);

    useEffect(() => {
        if (response) {
            setProduct(response);
        }
    }, [response]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    };

    const onUploadFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const formData = new FormData();
        if (files) {
            formData.append('image', files[0]);
            uploadRequest(() => UploadService.uploadFile(formData));
        }
    };

    const onUpdateHandler = (event: React.FormEvent<HTMLFontElement>) => {
        event.preventDefault();
        request(() => ProductService.updateProductById(productId, product));
    };

    const onCreateHandler = (event: React.FormEvent<HTMLFontElement>) => {
        event.preventDefault();
        request(() => ProductService.createProduct(product));
    };

    return (
        <>
            <GoBack />
            <h2>
                {productId ? (
                    <span>Edit Product #{productId}</span>
                ) : (
                    <span>Create product</span>
                )}
            </h2>

            {productId && loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    <span>{error}</span>
                </Message>
            ) : (
                <Form onSubmit={productId ? onUpdateHandler : onCreateHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                            value={product.name}
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Product price</Form.Label>
                        <Form.Control
                            value={product.price}
                            type="text"
                            placeholder="Enter price"
                            name="price"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Product image</Form.Label>
                        <Form.Control
                            value={product.image}
                            type="text"
                            placeholder="Enter image"
                            name="image"
                            onChange={onUploadFileChange}
                        />
                        <Form.File
                            id="image-file"
                            label="Choose file"
                            custom
                            onChange={onUploadFileChange}
                        />
                    </Form.Group>
                    <Image fluid src={product.image} />

                    <Form.Group controlId="description">
                        <Form.Label>Product description</Form.Label>
                        <Form.Control
                            value={product.description}
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            name="description"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            value={product.brand}
                            type="text"
                            placeholder="Enter brand"
                            name="brand"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Product category</Form.Label>
                        <Form.Control
                            value={product.category}
                            type="text"
                            placeholder="Enter category"
                            name="category"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="countInStock">
                        <Form.Label>Product Count in stock</Form.Label>
                        <Form.Control
                            value={product.countInStock}
                            type="text"
                            placeholder="Enter countInStock"
                            name="countInStock"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {productId ? (
                            <span>Update product</span>
                        ) : (
                            <span>Create product</span>
                        )}
                    </Button>
                </Form>
            )}
        </>
    );
};
