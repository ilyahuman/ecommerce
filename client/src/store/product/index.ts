import { Dispatch } from 'redux';
import axios from 'axios';
import { Product } from '../../types/index';

/**
 * * Actions
 */

enum ProductActionTypes {
    PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST',
    PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_FAILED = 'PRODUCT_LIST_FAILED',
}

interface ProductsRequest {
    type: ProductActionTypes.PRODUCT_LIST_REQUEST;
}

interface ProductsSuccess {
    type: ProductActionTypes.PRODUCT_LIST_SUCCESS;
    payload: Product[];
}

interface ProductsFailed {
    type: ProductActionTypes.PRODUCT_LIST_FAILED;
    payload: string;
}

type ProductActions = ProductsRequest | ProductsSuccess | ProductsFailed;

const productRequest = function (): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_REQUEST,
    };
};

const productSuccess = function (products: Product[]): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
        payload: products,
    };
};

const productFailed = function (error: string): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_FAILED,
        payload: error,
    };
};

/**
 * * Async actions
 */

export const asyncGetProducts = () => async (
    dispatch: Dispatch<ProductActions>
) => {
    try {
        dispatch(productRequest());

        const response = await axios.get<Product[]>(
            'http://localhost:5000/api/products'
        );

        if (response.data) {
            dispatch(productSuccess(response.data));
        }
    } catch (error) {
        dispatch(productFailed(error.message));
        console.error(error.message);
    }
};

/**
 * * Reducer
 *
 * @param state
 * @param action
 */

export interface ProductsState {
    products: Product[];
    loading: boolean;
    error?: string | null;
}

const productState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

export default function reducer(
    state: ProductsState = productState,
    action: ProductActions
) {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ProductActionTypes.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products].concat(action.payload),
            };
        case ProductActionTypes.PRODUCT_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
