import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, ProductsState } from './productList';
import { productDetailReducer, ProductDetailState } from './productDetail';
import { cartReducer, CartState } from './cart';
import { userReducer, UserState, isSignedIn } from './user';

import { CartProduct, User } from '../types';

export interface StoreRootState {
    products: ProductsState;
    productDetail: ProductDetailState;
    cart: CartState;
    user: UserState;
}

const reducers = combineReducers<StoreRootState>({
    products: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
});

// type reducerType = typeof reducers;
// type AppStateType = ReturnType<reducerType>

const middlewares = [thunk];

let persistCartItems = localStorage.getItem('cartItems');
let persistUser = localStorage.getItem('user');
let persistPaymentMethod = localStorage.getItem('paymentMethod');
let cartItems: CartProduct[] = [];
let currentUser: User = {} as User;
let paymentMethod: string = '';

if (persistCartItems) {
    cartItems = JSON.parse(persistCartItems);
}

if (persistUser) {
    currentUser = JSON.parse(persistUser);
}

if (persistPaymentMethod) {
    paymentMethod = JSON.parse(persistPaymentMethod);
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
        isSignedIn: isSignedIn(),
    },
};

export const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);
