import { Dispatch } from 'redux';
import axios from 'axios';
import { Product } from '../../types/index';

/**
 * * Actions
 */

enum ProductActionTypes {
    PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST',
    PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS',
    PRODUCT_DETAIL_FAILED = 'PRODUCT_DETAIL_FAILED',
}

interface ProductDetailRequest {
    type: ProductActionTypes.PRODUCT_DETAIL_REQUEST;
}

interface ProductDetailSuccess {
    type: ProductActionTypes.PRODUCT_DETAIL_SUCCESS;
    payload: Product;
}

interface ProductDetailFailed {
    type: ProductActionTypes.PRODUCT_DETAIL_FAILED;
    payload: string;
}

type ProductDetailActions =
    | ProductDetailRequest
    | ProductDetailSuccess
    | ProductDetailFailed;

const productRequest = function (): ProductDetailActions {
    return {
        type: ProductActionTypes.PRODUCT_DETAIL_REQUEST,
    };
};

const productSuccess = function (product: Product): ProductDetailActions {
    return {
        type: ProductActionTypes.PRODUCT_DETAIL_SUCCESS,
        payload: product,
    };
};

const productFailed = function (error: string): ProductDetailActions {
    return {
        type: ProductActionTypes.PRODUCT_DETAIL_FAILED,
        payload: error,
    };
};

/**
 * * Async actions
 */

export const asyncGetProduct = (id: string) => async (
    dispatch: Dispatch<ProductDetailActions>
) => {
    try {
        dispatch(productRequest());

        const response = await axios.get<Product>(
            `http://localhost:5000/api/products/${id}`
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

export interface ProductDetailState {
    product: {};
    loading: boolean;
    error: string | null;
}

const productState: ProductDetailState = {
    product: {},
    loading: false,
    error: '',
};

export function productDetailReducer(
    state: ProductDetailState = productState,
    action: ProductDetailActions
) {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ProductActionTypes.PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                product: Object.assign({}, action.payload),
            };
        case ProductActionTypes.PRODUCT_DETAIL_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
