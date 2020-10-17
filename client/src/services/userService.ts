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
    return axiosInstance.post<User>(`/users/signin`, user);
}

function signUp(user: UserSignUpRequest) {
    return axiosInstance.post<User>(`/users`, user);
}

function getUser() {
    return axiosInstance.get<User>(`/users/user`);
}

function updateUser(user: User) {
    return axiosInstance.put<User>(`/users/user`, {
        updateUser: user,
    });
}
