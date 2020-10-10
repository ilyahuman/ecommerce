import { Dispatch } from 'redux';
import axios from 'axios';
import { UserSignInRequest, User } from '../../types';

/**
 * * Actions
 */

enum UserActionTypes {
    SIGNIN_REQUEST = 'SIGNIN_REQUEST',
    SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
    SIGNIN_FAILED = 'SIGNIN_FAILED',
    LOGOUT_USER = 'LOGOUT_USER',
}

interface SignInRequest {
    type: UserActionTypes.SIGNIN_REQUEST;
}

interface SignInSuccess {
    type: UserActionTypes.SIGNIN_SUCCESS;
    payload: User;
}

interface SignInFailed {
    type: UserActionTypes.SIGNIN_FAILED;
    payload: string;
}

interface LogoutUser {
    type: UserActionTypes.LOGOUT_USER;
}

type UserActions = SignInRequest | SignInSuccess | SignInFailed | LogoutUser;

const signInRequest = function (): UserActions {
    return {
        type: UserActionTypes.SIGNIN_REQUEST,
    };
};

const signInSuccess = function (user: User): UserActions {
    return {
        type: UserActionTypes.SIGNIN_SUCCESS,
        payload: user,
    };
};

const signInFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.SIGNIN_FAILED,
        payload: error,
    };
};

const logoutUser = function (): UserActions {
    return {
        type: UserActionTypes.LOGOUT_USER,
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

        const { data } = await axios.post<User>(
            `http://localhost:5000/api/users/signin`,
            user
        );

        if (data) {
            dispatch(signInSuccess(data));
        }

        localStorage.setItem('user', JSON.stringify(data));
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

export const signOut = () => async (dispatch: Dispatch<UserActions>) => {
    // ? Here we can revoke token ?

    // Remove token from local storage and Redux.
    dispatch(logoutUser());
    localStorage.removeItem('user');
    //await dispatch(actions.reset());
    //await clearCheckoutDataFromStorage();

    // Now that we're signed out, forget the old (customer) cart.
    // We don't need to create a new cart here because we're going to refresh
    // the page immediately after.
    // await dispatch(removeCart());
};

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
}

export const isSignedIn = (): boolean => !!localStorage.getItem('user');

const productState: UserState = {
    currentUser: {} as User,
    loading: false,
    error: '',
    isSignedIn: isSignedIn(),
};

// TODO Change Token location (from user to more global)

/**
 * * SignIn reducer
 *
 * @param state
 * @param action
 */
export const signInReducer = (
    state: UserState = productState,
    action: UserActions
): UserState => {
    switch (action.type) {
        case UserActionTypes.SIGNIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UserActionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                isSignedIn: true,
                currentUser: Object.assign({}, action.payload),
            };
        case UserActionTypes.SIGNIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UserActionTypes.LOGOUT_USER:
            return {
                ...state,
                currentUser: {} as User,
                loading: false,
                error: null,
                isSignedIn: false,
            };
        default:
            return state;
    }
};
