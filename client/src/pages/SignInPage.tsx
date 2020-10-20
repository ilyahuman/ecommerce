import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { FormContainer } from '../components/FormContainer';

import { StoreRootState } from '../store';

import { useAuth } from '../hooks/useAuth';

export const SignInPage = () => {
    const { isSignedIn, signIn } = useAuth();
    const history = useHistory();
    const { loading, error } = useSelector(
        (state: StoreRootState) => state.user
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { search } = useLocation();

    const redirect: string = search ? search.split('=')[1] : '/';

    const onSubmitForm = (event: React.FormEvent<HTMLFontElement>) => {
        event.preventDefault();
        signIn(email, password);
    };

    const redirectPageAfterSignIn = () => {
        if (isSignedIn) {
            history.push(redirect);
        }
    };

    useEffect(() => {
        redirectPageAfterSignIn();
    }, [isSignedIn]);

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && (
                <Message variant="danger">
                    <span>{error}</span>
                </Message>
            )}
            {loading && <Loader />}
            <Form onSubmit={onSubmitForm}>
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
                <Button type="submit">Sign in</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New customer?{' '}
                    <Link
                        to={
                            redirect
                                ? `/signup?redirect=${redirect}`
                                : '/signup'
                        }
                    >
                        Sign up
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};
