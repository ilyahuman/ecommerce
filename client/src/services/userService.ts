import axios, { AxiosPromise } from 'axios';

import {
    User,
    UserSignInRequest,
    UserSignUpRequest,
    UserUpdateRequest,
} from '../types';

interface AuthService {
    signIn(user: UserSignInRequest): AxiosPromise<User>;
    signUp(user: UserSignUpRequest): AxiosPromise<User>;
    updateUser(user: UserUpdateRequest): AxiosPromise<User>;
    getUser(): AxiosPromise<User>;
}

export const AuthService: AuthService = {
    signIn,
    signUp,
    getUser,
    updateUser,
};

export function authHeader() {
    const storedUser = localStorage.getItem('user');
    let user: User = {} as User;
    if (storedUser) {
        user = JSON.parse(storedUser);
    }

    if (user && user.token) {
        // for Express back-end
        return { authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function signIn(user: UserSignInRequest) {
    return axios.post<User>(`http://localhost:5000/api/users/signin`, user);
}

function signUp(user: UserSignUpRequest) {
    return axios.post<User>(`http://localhost:5000/api/users`, user);
}

function getUser() {
    return axios.get<User>(`http://localhost:5000/api/users/user`, {
        headers: authHeader(),
    });
}

function updateUser(user: UserUpdateRequest) {
    return axios.put<User>(`http://localhost:5000/api/users/user`, user, {
        headers: authHeader(),
    });
}
