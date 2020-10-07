import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducer, ProductsState } from './productList';
import { productDetailReducer, ProductDetailState } from './productDetail';

export interface StoreRootState {
    products: ProductsState;
    productDetail: ProductDetailState;
}

const reducers = combineReducers<StoreRootState>({
    products: productListReducer,
    productDetail: productDetailReducer,
});

const middlewares = [thunk];

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
);
