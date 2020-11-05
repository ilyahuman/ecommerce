import { Dispatch } from 'redux';
import {
    UserSignInRequest,
    User,
    UserSignUpRequest,
    UserListItem,
    UserPersonalUpdateRequest,
    AuthToken,
} from '../../types';
import { storage } from '../../utils/simplePersistence';
import { InferValueTypes } from '../../utils/inferTypes';

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

export const userActions = {
    signInRequest: () => {
        return {
            type: UserActionTypes.SIGNIN_REQUEST,
        } as const;
    },

    signInSuccess: (token: AuthToken) => {
        return {
            type: UserActionTypes.SIGNIN_SUCCESS,
            payload: token,
        } as const;
    },

    signInFailed: (error: string) => {
        return {
            type: UserActionTypes.SIGNIN_FAILED,
            payload: error,
        } as const;
    },

    signUpRequest: () => {
        return {
            type: UserActionTypes.SIGNUP_REQUEST,
        } as const;
    },

    signUpSuccess: (token: AuthToken) => {
        return {
            type: UserActionTypes.SIGNUP_SUCCESS,
            payload: token,
        } as const;
    },

    signUpFailed: (error: string) => {
        return {
            type: UserActionTypes.SIGNUP_FAILED,
            payload: error,
        } as const;
    },

    userDetailsRequest: () => {
        return {
            type: UserActionTypes.USER_DETAILS_REQUEST,
        } as const;
    },

    userDetailsSuccess: (user: User) => {
        return {
            type: UserActionTypes.USER_DETAILS_SUCCESS,
            payload: user,
        } as const;
    },

    userDetailsFailed: (error: string) => {
        return {
            type: UserActionTypes.USER_DETAILS_FAILED,
            payload: error,
        } as const;
    },

    userPersonalUpdateRequest: () => {
        return {
            type: UserActionTypes.USER_UPDATE_REQUEST,
        } as const;
    },

    userUpdateSuccess: (user: User) => {
        return {
            type: UserActionTypes.USER_UPDATE_SUCCESS,
            payload: user,
        } as const;
    },

    userUpdateFailed: (error: string) => {
        return {
            type: UserActionTypes.USER_UPDATE_FAILED,
            payload: error,
        } as const;
    },

    signOutUser: () => {
        return {
            type: UserActionTypes.USER_SIGNOUT,
        } as const;
    },

    clearError: () => {
        return {
            type: UserActionTypes.CLEAR_ERROR,
        } as const;
    },

    userListRequest: () => {
        return {
            type: UserActionTypes.USER_LIST_REQUEST,
        } as const;
    },

    userListSuccess: (users: UserListItem[]) => {
        return {
            type: UserActionTypes.USER_LIST_SUCCESS,
            payload: users,
        } as const;
    },

    userListFailed: (error: string) => {
        return {
            type: UserActionTypes.USER_LIST_FAILED,
            payload: error,
        } as const;
    },

    userDeleteRequest: () => {
        return {
            type: UserActionTypes.USER_DELETE_REQUEST,
        } as const;
    },

    userDeleteSuccess: (response: string) => {
        return {
            type: UserActionTypes.USER_DELETE_SUCCESS,
            payload: response,
        } as const;
    },

    userDeleteFailed: (error: string) => {
        return {
            type: UserActionTypes.USER_DELETE_FAILED,
            payload: error,
        } as const;
    },

    userListClear: () => {
        return {
            type: UserActionTypes.USER_LIST_CLEAR,
        } as const;
    },
};

export type UserActions = ReturnType<InferValueTypes<typeof userActions>>;

/**
 * * Async actions
 */

export const asyncSignIn = (user: UserSignInRequest) => async (
    dispatch: Dispatch<UserActions>
) => {
    try {
        dispatch(userActions.signInRequest());

        const { data: token } = await AuthService.signIn(user);

        if (token) {
            dispatch(userActions.signInSuccess(token));

            storage.setItem('token', token);

            // @ts-ignore
            dispatch(asyncGetUser());
        }
    } catch (error) {
        dispatch(
            userActions.signInFailed(
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
        dispatch(userActions.signUpRequest());

        // Save to DB and if all is OK go forward
        const { data: token } = await AuthService.signUp(userCreds);

        if (token) {
            dispatch(userActions.signUpSuccess(token));

            storage.setItem('token', token);

            // @ts-ignore
            dispatch(asyncGetUser());
        }
    } catch (error) {
        dispatch(
            userActions.signUpFailed(
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
        dispatch(userActions.userDetailsRequest());

        const { data } = await UserService.getUserDetails();

        if (data) {
            dispatch(userActions.userDetailsSuccess(data));

            storage.setItem('user', data);
        }
    } catch (error) {
        dispatch(
            userActions.userDetailsFailed(
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
    dispatch(userActions.signOutUser());
    storage.removeItem('user');
    storage.removeItem('token');
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
        dispatch(userActions.userPersonalUpdateRequest());

        const store = getState();
        const {
            user: { currentUser },
        } = store;

        const { data } = await UserService.updateUser(
            Object.assign({}, currentUser, userCreds)
        );

        if (data) {
            const userUpdated = Object.assign({}, currentUser, data);

            dispatch(userActions.userUpdateSuccess(userUpdated));

            storage.setItem('user', userUpdated);
        }
    } catch (error) {
        dispatch(
            userActions.userUpdateFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

// ! Admin actions

export const asyncUserList = () => async (dispatch: Dispatch<UserActions>) => {
    try {
        dispatch(userActions.userListRequest());

        const { data } = await UserService.getUserList();

        if (data) {
            dispatch(userActions.userListSuccess(data));
        }
    } catch (error) {
        dispatch(
            userActions.userListFailed(
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
        dispatch(userActions.userListClear());
    } catch (error) {}
};

export const asyncDeleteUser = (id: string) => async (
    dispatch: Dispatch<UserActions>
) => {
    try {
        dispatch(userActions.userDeleteRequest());

        const { data } = await UserService.deleteUser(id);

        if (data) {
            dispatch(userActions.userDeleteSuccess(data));
            // @ts-ignore
            dispatch(asyncUserList());
        }
    } catch (error) {
        dispatch(
            userActions.userDeleteFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};
