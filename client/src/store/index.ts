import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { storage } from '../utils/simplePersistence';
import { productListReducer } from './productList';
import { productDetailReducer } from './productDetail';
import { cartReducer } from './cart';
import { userReducer, isSignedIn, userListReducer } from './user';
import { orderReducer, orderListReducer } from './order';

const adminReducers = combineReducers({
    userList: userListReducer,
    orderList: orderListReducer,
});

const reducers = combineReducers({
    products: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    admin: adminReducers,
});

export type StoreRootState = ReturnType<typeof reducers>;

const middlewares = [thunk];

const initialState = {
    cart: {
        cartItems: storage.getItem('cartItems') || [],
        paymentMethod: storage.getItem('paymentMethod') || null,
    },
    user: {
        currentUser: storage.getItem('user') || {},
        loading: false,
        error: null,
        token: storage.getItem('token') || {},
        isSignedIn: isSignedIn(),
    },
};

export const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);
