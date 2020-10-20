import { Dispatch } from 'redux';
import {
    UserSignInRequest,
    User,
    UserSignUpRequest,
    UserListItem,
    UserPersonalUpdateRequest,
    AuthToken,
} from '../../types';

import { UserActionTypes } from './consts';

import { StoreRootState } from '../index';
import { asyncCartReset } from '../cart';
import { asyncOrderReset } from '../order';

// Services
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/userService';

/**
 * * Actions
 */

// * Sign In
interface SignInRequestAction {
    type: UserActionTypes.SIGNIN_REQUEST;
}

interface SignInSuccessAction {
    type: UserActionTypes.SIGNIN_SUCCESS;
    payload: AuthToken;
}

interface SignInFailedAction {
    type: UserActionTypes.SIGNIN_FAILED;
    payload: string;
}

// * Sign Up
interface SignUpRequestAction {
    type: UserActionTypes.SIGNUP_REQUEST;
}

interface SignUpSuccessAction {
    type: UserActionTypes.SIGNUP_SUCCESS;
    payload: AuthToken;
}

interface SignUpFailedAction {
    type: UserActionTypes.SIGNUP_FAILED;
    payload: string;
}

// * Get User Details
interface UserDetailsRequestAction {
    type: UserActionTypes.USER_DETAILS_REQUEST;
}

interface UserDetailsSuccessAction {
    type: UserActionTypes.USER_DETAILS_SUCCESS;
    payload: User;
}

interface UserDetailsFailedAction {
    type: UserActionTypes.USER_DETAILS_FAILED;
    payload: string;
}

// * Sign Out
interface SignOutUserAction {
    type: UserActionTypes.USER_SIGNOUT;
}

// * Clear Error
interface ClearErrorAction {
    type: UserActionTypes.CLEAR_ERROR;
}

// * Update user info
interface UserPersonalUpdateRequestAction {
    type: UserActionTypes.USER_UPDATE_REQUEST;
}

interface UserUpdateSuccessAction {
    type: UserActionTypes.USER_UPDATE_SUCCESS;
    payload: User;
}

interface UserUpdateFailedAction {
    type: UserActionTypes.USER_UPDATE_FAILED;
    payload: string;
}

// ! Admin actions
// * Get User List
interface UserListRequestAction {
    type: UserActionTypes.USER_LIST_REQUEST;
}

interface UserListSuccessAction {
    type: UserActionTypes.USER_LIST_SUCCESS;
    payload: UserListItem[];
}

interface UserListFailedAction {
    type: UserActionTypes.USER_LIST_FAILED;
    payload: string;
}

// * User List CLear
interface UserListClearAction {
    type: UserActionTypes.USER_LIST_CLEAR;
}

// * User Delete
interface UserDeleteRequestAction {
    type: UserActionTypes.USER_DELETE_REQUEST;
}

interface UserDeleteSuccessAction {
    type: UserActionTypes.USER_DELETE_SUCCESS;
    payload: string;
}

interface UserDeleteFailedAction {
    type: UserActionTypes.USER_DELETE_FAILED;
    payload: string;
}

export type UserActions =
    | SignInRequestAction
    | SignInSuccessAction
    | SignInFailedAction
    | SignUpRequestAction
    | SignUpSuccessAction
    | SignUpFailedAction
    | UserDetailsRequestAction
    | UserDetailsSuccessAction
    | UserDetailsFailedAction
    | UserPersonalUpdateRequestAction
    | UserUpdateSuccessAction
    | UserUpdateFailedAction
    | SignOutUserAction
    | UserListRequestAction
    | UserListSuccessAction
    | UserListFailedAction
    | UserListClearAction
    | UserDeleteRequestAction
    | UserDeleteSuccessAction
    | UserDeleteFailedAction
    | ClearErrorAction;

export const signInRequest = function (): UserActions {
    return {
        type: UserActionTypes.SIGNIN_REQUEST,
    };
};

export const signInSuccess = function (token: AuthToken): UserActions {
    return {
        type: UserActionTypes.SIGNIN_SUCCESS,
        payload: token,
    };
};

export const signInFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.SIGNIN_FAILED,
        payload: error,
    };
};

export const signUpRequest = function (): UserActions {
    return {
        type: UserActionTypes.SIGNUP_REQUEST,
    };
};

export const signUpSuccess = function (token: AuthToken): UserActions {
    return {
        type: UserActionTypes.SIGNUP_SUCCESS,
        payload: token,
    };
};

export const signUpFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.SIGNUP_FAILED,
        payload: error,
    };
};

export const userDetailsRequest = function (): UserActions {
    return {
        type: UserActionTypes.USER_DETAILS_REQUEST,
    };
};

export const userDetailsSuccess = function (user: User): UserActions {
    return {
        type: UserActionTypes.USER_DETAILS_SUCCESS,
        payload: user,
    };
};

export const userDetailsFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.USER_DETAILS_FAILED,
        payload: error,
    };
};

export const userPersonalUpdateRequest = function (): UserActions {
    return {
        type: UserActionTypes.USER_UPDATE_REQUEST,
    };
};

export const userUpdateSuccess = function (user: User): UserActions {
    return {
        type: UserActionTypes.USER_UPDATE_SUCCESS,
        payload: user,
    };
};

export const userUpdateFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.USER_UPDATE_FAILED,
        payload: error,
    };
};

export const signOutUser = function (): UserActions {
    return {
        type: UserActionTypes.USER_SIGNOUT,
    };
};

export const clearError = function (): ClearErrorAction {
    return {
        type: UserActionTypes.CLEAR_ERROR,
    };
};

export const userListRequest = function (): UserActions {
    return {
        type: UserActionTypes.USER_LIST_REQUEST,
    };
};

export const userListSuccess = function (users: UserListItem[]): UserActions {
    return {
        type: UserActionTypes.USER_LIST_SUCCESS,
        payload: users,
    };
};

export const userListFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.USER_LIST_FAILED,
        payload: error,
    };
};

export const userDeleteRequest = function (): UserActions {
    return {
        type: UserActionTypes.USER_DELETE_REQUEST,
    };
};

export const userDeleteSuccess = function (response: string): UserActions {
    return {
        type: UserActionTypes.USER_DELETE_SUCCESS,
        payload: response,
    };
};

export const userDeleteFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.USER_DELETE_FAILED,
        payload: error,
    };
};

export const userListClear = function (): UserActions {
    return {
        type: UserActionTypes.USER_LIST_CLEAR,
    };
};

/**
 * * Async actions
 */

export const asyncSignIn = (user: UserSignInRequest) => async (
    dispatch: Dispatch<UserActions>
) => {
    try {
        dispatch(signInRequest());

        const { data: token } = await AuthService.signIn(user);

        if (token) {
            dispatch(signInSuccess(token));
            localStorage.setItem('token', JSON.stringify(token));

            // @ts-ignore
            dispatch(asyncGetUser());
        }
    } catch (error) {
        dispatch(
            signInFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

// TODO any type and Dispatch asyncAction inside asyncAction
export const asyncSignUp = (userCreds: UserSignUpRequest) => async (
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(signUpRequest());

        // Save to DB and if all is OK go forward
        const { data: token } = await AuthService.signUp(userCreds);

        if (token) {
            dispatch(signUpSuccess(token));
            localStorage.setItem('token', JSON.stringify(token));

            // @ts-ignore
            dispatch(asyncGetUser());
        }
    } catch (error) {
        dispatch(
            signUpFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncGetUser = () => async (dispatch: Dispatch<UserActions>) => {
    try {
        dispatch(userDetailsRequest());

        const { data } = await UserService.getUserDetails();

        if (data) {
            dispatch(userDetailsSuccess(data));
            localStorage.setItem('user', JSON.stringify(data));
        }
    } catch (error) {
        dispatch(
            userDetailsFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncSignOut = () => async (dispatch: Dispatch<UserActions>) => {
    // ? Here we can revoke token ?

    // * Remove user and token from local storage and Redux.
    dispatch(signOutUser());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // * Clean cart and orders from local storage and Redux.
    // @ts-ignore
    dispatch(asyncCartReset());
    // @ts-ignore
    dispatch(asyncOrderReset());
    // * Clean user list from admin
    // @ts-ignore
    dispatch(asyncUserListClear());
    //await clearCheckoutDataFromStorage();

    // Now that we're signed out, forget the old (customer) cart.
    // We don't need to create a new cart here because we're going to refresh
    // the page immediately after.
    // await dispatch(removeCart());
};

// TODO make this better (now this async is used in several forms with different)
export const asyncUpdateUser = (userCreds: UserPersonalUpdateRequest) => async (
    dispatch: Dispatch<UserActions>,
    getState: () => StoreRootState
) => {
    try {
        dispatch(userPersonalUpdateRequest());

        const store = getState();
        const {
            user: { currentUser },
        } = store;

        const { data } = await UserService.updateUser(
            Object.assign({}, currentUser, userCreds)
        );

        if (data) {
            const userUpdated = Object.assign({}, currentUser, data);

            dispatch(userUpdateSuccess(userUpdated));

            localStorage.setItem('user', JSON.stringify(userUpdated));
        }
    } catch (error) {
        dispatch(
            userUpdateFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncUserList = () => async (dispatch: Dispatch<UserActions>) => {
    try {
        dispatch(userListRequest());

        const { data } = await UserService.getUserList();

        if (data) {
            dispatch(userListSuccess(data));
        }
    } catch (error) {
        dispatch(
            userListFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncUserListClear = () => async (
    dispatch: Dispatch<UserActions>
) => {
    try {
        dispatch(userListClear());
    } catch (error) {}
};

export const asyncDeleteUser = (id: string) => async (
    dispatch: Dispatch<UserActions>
) => {
    try {
        dispatch(userDeleteRequest());

        const { data } = await UserService.deleteUser(id);

        if (data) {
            dispatch(userDeleteSuccess(data));
            // @ts-ignore
            dispatch(asyncUserList());
        }
    } catch (error) {
        dispatch(
            userDeleteFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};
