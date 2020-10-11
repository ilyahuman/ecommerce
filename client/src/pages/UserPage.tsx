import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { StoreRootState } from '../store';
import { asyncUpdateUser } from '../store/user';
import { Message } from '../components/Message';

export const UserPage = () => {
    const dispatch = useDispatch();
    const { currentUser, isSignedIn } = useSelector(
        (state: StoreRootState) => state.user
    );

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updateDate = {
            email,
            name,
            password,
        };

        if (currentUser.name === name && currentUser.email === email) {
            return setMessage('The same data');
        }

        dispatch(
            asyncUpdateUser({
                email,
                name,
                password,
            })
        );

        setPassword('');
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            {message && <Message variant="danger">{message}</Message>}
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="name"
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};
