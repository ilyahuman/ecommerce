import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, ProductsState } from './productList';
import { productDetailReducer, ProductDetailState } from './productDetail';
import { cartReducer, CartState } from './cart';
import {
    userReducer,
    UserState,
    isSignedIn,
    userListReducer,
    UserListState,
} from './user';
import { orderReducer, OrderState } from './order';

import { CartProduct, User, AuthToken } from '../types';

const reducers = combineReducers({
    products: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
    userList: userListReducer,
    order: orderReducer,
});

export type StoreRootState = ReturnType<typeof reducers>;

const middlewares = [thunk];

let persistCartItems = localStorage.getItem('cartItems');
let persistUser = localStorage.getItem('user');
let persistToken = localStorage.getItem('token');
let persistPaymentMethod = localStorage.getItem('paymentMethod');
let cartItems: CartProduct[] = [];
let currentUser: User = {} as User;
let paymentMethod: string = '';
let token: AuthToken = {} as AuthToken;

if (persistCartItems) {
    cartItems = JSON.parse(persistCartItems);
}

if (persistUser) {
    currentUser = JSON.parse(persistUser);
}

if (persistPaymentMethod) {
    paymentMethod = JSON.parse(persistPaymentMethod);
}

if (persistToken) {
    token = JSON.parse(persistToken);
}

// TODO Types for initial state

const initialState = {
    cart: {
        cartItems,
        paymentMethod: paymentMethod || null,
    },
    user: {
        currentUser: currentUser,
        loading: false,
        error: null,
        token: token,
        isSignedIn: isSignedIn(),
    },
};

export const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);
