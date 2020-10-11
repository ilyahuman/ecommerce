import { Dispatch } from 'redux';
import {
    UserSignInRequest,
    User,
    UserSignUpRequest,
    UserUpdateRequest,
} from '../../types';

// Utils
import { history } from '../../utils/history';

// Services
import { AuthService } from '../../services/userService';

/**
 * * Actions
 */

enum UserActionTypes {
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAILED,

    SIGNUP_REQUEST,
    SIGNUP_FAILED,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILED,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED,

    SIGNOUT_USER,
    CLEAR_ERROR,
}

interface SignInRequestAction {
    type: UserActionTypes.SIGNIN_REQUEST;
}

interface SignInSuccessAction {
    type: UserActionTypes.SIGNIN_SUCCESS;
    payload: User;
}

interface SignInFailedAction {
    type: UserActionTypes.SIGNIN_FAILED;
    payload: string;
}

interface SignUpRequestAction {
    type: UserActionTypes.SIGNUP_REQUEST;
}

interface SignUpFailedAction {
    type: UserActionTypes.SIGNUP_FAILED;
    payload: string;
}

interface SignOutUserAction {
    type: UserActionTypes.SIGNOUT_USER;
}

interface ClearErrorAction {
    type: UserActionTypes.CLEAR_ERROR;
}

interface UserUpdateRequestAction {
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

type UserActions =
    | SignInRequestAction
    | SignInSuccessAction
    | SignInFailedAction
    | UserUpdateRequestAction
    | UserUpdateSuccessAction
    | UserUpdateFailedAction
    | SignUpRequestAction
    | SignUpFailedAction
    | SignOutUserAction
    | ClearErrorAction;

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

const signUpRequest = function (): UserActions {
    return {
        type: UserActionTypes.SIGNUP_REQUEST,
    };
};

const signUpFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.SIGNUP_FAILED,
        payload: error,
    };
};

const userUpdateRequest = function (): UserActions {
    return {
        type: UserActionTypes.SIGNIN_REQUEST,
    };
};

const userUpdateSuccess = function (user: User): UserActions {
    return {
        type: UserActionTypes.SIGNIN_SUCCESS,
        payload: user,
    };
};

const userUpdateFailed = function (error: string): UserActions {
    return {
        type: UserActionTypes.SIGNIN_FAILED,
        payload: error,
    };
};

const signOutUser = function (): UserActions {
    return {
        type: UserActionTypes.SIGNOUT_USER,
    };
};

export const clearError = function (): ClearErrorAction {
    return {
        type: UserActionTypes.CLEAR_ERROR,
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

        const { data } = await AuthService.signIn(user);

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

// TODO any type and Dispatch asyncAction inside asyncAction
export const asyncSignUp = (userCreds: UserSignUpRequest) => async (
    dispatch: Dispatch<any>
) => {
    try {
        const { email, password } = userCreds;

        dispatch(signUpRequest());

        // Save to DB and if all is OK go forward
        await AuthService.signUp(userCreds);

        // Use prev User to login
        dispatch(asyncSignIn({ email, password }));
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

export const asyncSignOut = () => async (dispatch: Dispatch<UserActions>) => {
    // ? Here we can revoke token ?

    // Remove token from local storage and Redux.
    dispatch(signOutUser());
    localStorage.removeItem('user');
    history.push('/');
    //await dispatch(actions.reset());
    //await clearCheckoutDataFromStorage();

    // Now that we're signed out, forget the old (customer) cart.
    // We don't need to create a new cart here because we're going to refresh
    // the page immediately after.
    // await dispatch(removeCart());
};

export const asyncUpdateUser = (userCreds: UserUpdateRequest) => async (
    dispatch: Dispatch<UserActions>
) => {
    try {
        dispatch(userUpdateRequest());

        const { data } = await AuthService.updateUser(userCreds);

        if (data) {
            dispatch(userUpdateSuccess(data));

            localStorage.setItem('user', JSON.stringify(data));
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

export const asyncGetUser = () => async (dispatch: Dispatch<UserActions>) => {
    try {
        const { data } = await AuthService.getUser();
    } catch (error) {
        console.error(error.message);
    }
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

const userState: UserState = {
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
    state: UserState = userState,
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
        case UserActionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UserActionTypes.SIGNUP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UserActionTypes.USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UserActionTypes.USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                isSignedIn: true,
                currentUser: Object.assign({}, action.payload),
            };
        case UserActionTypes.USER_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UserActionTypes.SIGNOUT_USER:
            return {
                ...state,
                currentUser: {} as User,
                loading: false,
                error: null,
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
