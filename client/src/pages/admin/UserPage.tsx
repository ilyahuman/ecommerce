import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { StoreRootState } from '../../store';
import { asyncUpdateUser } from '../../store/user';
import { Message } from '../../components/Message';
import { User, UserPersonalUpdateRequest } from '../../types';
import { asyncGetUser } from '../../store/user/actions';
import { asyncGetOrders } from '../../store/order';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { AppRoutes } from '../../config';
import { GoBack } from '../../components/GoBack';

import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

// Services
import { UserService } from '../../services/userService';
import { UserList } from './UserList';

export const UserPage = (props: any) => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>({} as User);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const userFetch = useFetch<User>();
    const updateFetch = useFetch<User>();
    const { _id: currentUserId } = useSelector(
        (state: StoreRootState) => state.user.currentUser
    );

    useEffect(() => {
        if (userFetch.response) {
            setUser(userFetch.response);
            setName(userFetch.response.name);
            setEmail(userFetch.response.email);
        }
    }, [userFetch.response]);

    useEffect(() => {
        userFetch.request(() => UserService.getUserById(id));
        if (id === currentUserId) {
            console.log('same');
        }

        return () => {
            debugger;
            updateFetch.setIsMounted();
        };
    }, [updateFetch.response]);

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateFetch.request(() =>
            UserService.updateUserById(user._id, { email, name })
        );
    };

    return (
        <>
            <h2>User Info {user._id}</h2>
            <GoBack />
            <Row>
                <Col xs={12} sm={12} md={6}>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                type="name"
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                type="email"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};
