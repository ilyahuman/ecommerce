import { User, UserListItem, AuthToken } from '../../types';
import { UserActions } from './actions';

import { UserActionTypes } from './consts';

/**
 * * Reducer
 *
 * @param state
 * @param action
 */

export interface UserState {
    currentUser: User;
    loading: boolean;
    error: string | null;
    isSignedIn: boolean;
    token: AuthToken;
}

export const isSignedIn = (): boolean => !!localStorage.getItem('user');

const userState: UserState = {
    currentUser: {
        _id: '',
        email: '',
        name: '',
        isAdmin: false,
        shippingAddress: {
            city: '',
            address: '',
            country: '',
            postalCode: '',
        },
    },
    token: {} as AuthToken,
    loading: false,
    error: null,
    isSignedIn: isSignedIn(),
};

// TODO Change Token location (from user to more global)

/**
 * * User reducer
 *
 * @param state
 * @param action
 */
export const userReducer = (
    state: UserState = userState,
    action: UserActions
): UserState => {
    switch (action.type) {
        case UserActionTypes.SIGNIN_REQUEST:
        case UserActionTypes.SIGNUP_REQUEST:
        case UserActionTypes.USER_DETAILS_REQUEST:
        case UserActionTypes.USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UserActionTypes.SIGNIN_SUCCESS:
        case UserActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isSignedIn: true,
                token: action.payload,
            };
        case UserActionTypes.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            };
        case UserActionTypes.USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: Object.assign(
                    {},
                    state.currentUser,
                    action.payload
                ),
            };

        case UserActionTypes.SIGNIN_FAILED:
        case UserActionTypes.SIGNUP_FAILED:
        case UserActionTypes.USER_DETAILS_FAILED:
        case UserActionTypes.USER_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UserActionTypes.USER_SIGNOUT:
            return {
                ...state,
                currentUser: {} as User,
                loading: false,
                error: null,
                token: {} as AuthToken,
                isSignedIn: false,
            };
        case UserActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export interface UserListState {
    users: UserListItem[];
    loading: boolean;
    error: string | null;
}

const userListState: UserListState = {
    users: [],
    loading: false,
    error: '',
};

export const userListReducer = (
    state: UserListState = userListState,
    action: UserActions
): UserListState => {
    switch (action.type) {
        case UserActionTypes.USER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UserActionTypes.USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case UserActionTypes.USER_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
