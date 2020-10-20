import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

import { User, UserPersonalUpdateRequest, UserListItem } from '../types';

interface UserService {
    updateUser(user: UserPersonalUpdateRequest): AxiosPromise<User>;
    getUserDetails(): AxiosPromise<User>;
    getUserList(): AxiosPromise<UserListItem[]>;
    deleteUser(id: string): AxiosPromise;
}

export const UserService: UserService = {
    getUserDetails,
    updateUser,
    getUserList,
    deleteUser,
};

function getUserDetails() {
    return axiosInstance.get<User>('/users/user');
}

function updateUser(user: User) {
    return axiosInstance.put<User>('/users/user', {
        updateUser: user,
    });
}

function getUserList() {
    return axiosInstance.get<UserListItem[]>('/users');
}

function deleteUser(id: string) {
    debugger;
    return axiosInstance.delete<string>(`/users/${id}`);
}
