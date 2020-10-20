import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';

import { StoreRootState } from '../../store';
import { asyncUserList, asyncDeleteUser } from '../../store/user/actions';
import { UserListItem } from '../../types';
import { LinkContainer } from 'react-router-bootstrap';

export const UserList = ({ match }: any) => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(
        (state: StoreRootState) => state.userList
    );

    const onDeleteHandler = (id: string) => {
        if (window.confirm('Are you sure?')) {
            dispatch(asyncDeleteUser(id));
        }
    };

    useEffect(() => {
        dispatch(asyncUserList());
    }, []);

    return (
        <>
            <h2>User List</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : users.length === 0 ? (
                <Message variant="danger">There are no users</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: UserListItem, index: number) => {
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.isAdmin ? (
                                            <i
                                                className="fas fa-check"
                                                style={{ color: 'green' }}
                                            ></i>
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: 'red' }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <LinkContainer
                                                to={`${match.path}/${user._id}`}
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
                                                    onDeleteHandler(user._id)
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
