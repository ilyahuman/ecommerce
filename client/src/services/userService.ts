import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

import { User, UserPersonalUpdateRequest, UserListItem } from '../types';

interface UserService {
    updateUser(user: UserPersonalUpdateRequest): AxiosPromise<User>;
    getUserDetails(): AxiosPromise<User>;
    getUserList(): AxiosPromise<UserListItem[]>;
    deleteUser(id: string): AxiosPromise;
    getUserById(id: string): AxiosPromise<User>;
    updateUserById(
        id: string,
        data: UserPersonalUpdateRequest
    ): AxiosPromise<User>;
}

export const UserService: UserService = {
    getUserDetails,
    updateUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserById,
};

function getUserDetails() {
    return axiosInstance.get<User>('/users/user');
}

function updateUser(user: User) {
    return axiosInstance.put<User>('/users/user', {
        updateUser: user,
    });
}

// !Admin
function getUserList() {
    return axiosInstance.get<UserListItem[]>('/users');
}

function deleteUser(id: string) {
    return axiosInstance.delete<string>(`/users/${id}`);
}

function getUserById(id: string) {
    return axiosInstance.get<User>(`/users/${id}`);
}

function updateUserById(id: string, data: UserPersonalUpdateRequest) {
    return axiosInstance.put<User>(`/users/${id}`, data);
}
