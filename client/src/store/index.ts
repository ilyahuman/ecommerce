import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import productReducer, { ProductsState } from './product';

export interface StoreRootState {
    product: ProductsState;
}

const reducers = combineReducers<StoreRootState>({
    product: productReducer,
});

const middlewares = [thunk];

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
);
