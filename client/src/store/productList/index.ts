import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { Product } from '../../types/index';

// Services
import { ProductService } from '../../services/productService';

/**
 * * Actions
 */

enum ProductActionTypes {
    PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST',
    PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_FAILED = 'PRODUCT_LIST_FAILED',

    PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST',
    PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS',
    PRODUCT_DELETE_FAILED = 'PRODUCT_DELETE_FAILED',
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

interface ProductDeleteRequest {
    type: ProductActionTypes.PRODUCT_DELETE_REQUEST;
}

interface ProductDeleteSuccess {
    type: ProductActionTypes.PRODUCT_DELETE_SUCCESS;
    payload: Product[];
}

interface ProductDeleteFailed {
    type: ProductActionTypes.PRODUCT_DELETE_FAILED;
    payload: string;
}

type ProductActions =
    | ProductsRequest
    | ProductsSuccess
    | ProductsFailed
    | ProductDeleteRequest
    | ProductDeleteSuccess
    | ProductDeleteFailed;

const productsRequest = function (): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_REQUEST,
    };
};

const productsSuccess = function (products: Product[]): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
        payload: products,
    };
};

const productsFailed = function (error: string): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_FAILED,
        payload: error,
    };
};

const productDeleteRequest = function (): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_REQUEST,
    };
};

const productDeleteSuccess = function (products: Product[]): ProductActions {
    return {
        type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
        payload: products,
    };
};

const productDeleteFailed = function (error: string): ProductActions {
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
        dispatch(productsRequest());

        const { data } = await ProductService.getProducts();

        if (data) {
            dispatch(productsSuccess(data));
        }
    } catch (error) {
        dispatch(
            productsFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncDeleteProduct = (id: string) => async (
    dispatch: Dispatch<ProductActions>
) => {
    try {
        dispatch(productDeleteRequest());

        const { data } = await ProductService.deleteProductById(id);

        if (data) {
            // dispatch(productDeleteSuccess(data));
            // @ts-ignore
            dispatch(asyncGetProducts());
        }
    } catch (error) {
        dispatch(
            productDeleteFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
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

export const productListReducer = (
    state: ProductsState = productState,
    action: ProductActions
): ProductsState => {
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
                products: action.payload,
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
};
