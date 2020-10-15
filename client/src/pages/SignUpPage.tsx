import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { FormContainer } from '../components/FormContainer';

import { asyncSignUp } from '../store/user';
import { StoreRootState } from '../store';

import { isObjectEmpty } from '../utils/isObjectEmpty';

export const SignUpPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isSignedIn, loading, error } = useSelector(
        (state: StoreRootState) => state.user
    );

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const { search } = useLocation();
    const redirect: string = search ? search.split('=')[1] : '/';

    const onSubmitForm = (event: React.FormEvent<HTMLFontElement>) => {
        event.preventDefault();
        dispatch(asyncSignUp({ name, email, password }));
    };

    useEffect(() => {
        if (isSignedIn) {
            history.push(redirect);
        }
    }, [isSignedIn]);

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && (
                <Message variant="danger">
                    <span>{error}</span>
                </Message>
            )}
            {loading && <Loader />}
            <Form onSubmit={onSubmitForm}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={(event) => setName(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(event) => setPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit">Sign Up</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have a account?{' '}
                    <Link
                        to={
                            redirect
                                ? `/signin?redirect=${redirect}`
                                : '/signin'
                        }
                    >
                        Sign in
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
