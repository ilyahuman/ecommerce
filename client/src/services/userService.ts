import axios, { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

import {
    User,
    UserSignInRequest,
    UserSignUpRequest,
    UserPersonalUpdateRequest,
} from '../types';

interface AuthService {
    signIn(user: UserSignInRequest): AxiosPromise<User>;
    signUp(user: UserSignUpRequest): AxiosPromise<User>;
    updateUser(user: UserPersonalUpdateRequest): AxiosPromise<User>;
    getUser(): AxiosPromise<User>;
}

export const AuthService: AuthService = {
    signIn,
    signUp,
    getUser,
    updateUser,
};

function signIn(user: UserSignInRequest) {
    return axiosInstance.post<User>(
        `http://localhost:5000/api/users/signin`,
        user
    );
}

function signUp(user: UserSignUpRequest) {
    return axiosInstance.post<User>(`http://localhost:5000/api/users`, user);
}

function getUser() {
    return axiosInstance.get<User>(`http://localhost:5000/api/users/user`);
}

function updateUser(user: User) {
    return axiosInstance.put<User>(`http://localhost:5000/api/users/user`, {
        updateUser: user,
    });
}
