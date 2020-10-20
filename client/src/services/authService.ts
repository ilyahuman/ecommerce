import { AxiosPromise } from 'axios';
import { axiosInstance } from './axiosInstance';

import { UserSignInRequest, UserSignUpRequest, AuthToken } from '../types';

interface AuthService {
    signIn(user: UserSignInRequest): AxiosPromise<AuthToken>;
    signUp(user: UserSignUpRequest): AxiosPromise<AuthToken>;
}

export const AuthService: AuthService = {
    signIn,
    signUp,
};

function signIn(user: UserSignInRequest) {
    return axiosInstance.post<AuthToken>('/users/signin', user);
}

function signUp(user: UserSignUpRequest) {
    return axiosInstance.post<AuthToken>('/users', user);
}
