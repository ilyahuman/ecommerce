import { Dispatch } from 'redux';
import { Product, ProductCollection } from '../../types/index';

// Services
import { ProductService } from '../../services/productService';
import { InferValueTypes } from '../../utils/inferTypes';

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

const productActions = {
    productsRequest: () => {
        return {
            type: ProductActionTypes.PRODUCT_LIST_REQUEST,
        } as const;
    },

    productsSuccess: (productCollection: ProductCollection) => {
        return {
            type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
            payload: productCollection,
        } as const;
    },

    productsFailed: (error: string) => {
        return {
            type: ProductActionTypes.PRODUCT_LIST_FAILED,
            payload: error,
        } as const;
    },

    productDeleteRequest: () => {
        return {
            type: ProductActionTypes.PRODUCT_DELETE_REQUEST,
        } as const;
    },

    productDeleteSuccess: (products: ProductCollection) => {
        return {
            type: ProductActionTypes.PRODUCT_DELETE_SUCCESS,
            payload: products,
        } as const;
    },

    productDeleteFailed: (error: string) => {
        return {
            type: ProductActionTypes.PRODUCT_DELETE_FAILED,
            payload: error,
        } as const;
    },
};

type ProductActions = ReturnType<InferValueTypes<typeof productActions>>;

/**
 * * Async actions
 */

export const asyncGetProducts = (
    pageNumber: string = '',
    keyword?: string
) => async (dispatch: Dispatch<ProductActions>) => {
    try {
        dispatch(productActions.productsRequest());

        const { data } = await ProductService.getProducts(pageNumber, keyword);

        if (data) {
            dispatch(productActions.productsSuccess(data));
        }
    } catch (error) {
        dispatch(
            productActions.productsFailed(
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
        dispatch(productActions.productDeleteRequest());

        const { data } = await ProductService.deleteProductById(id);

        if (data) {
            // dispatch(productDeleteSuccess(data));
            // @ts-ignore
            dispatch(asyncGetProducts());
        }
    } catch (error) {
        dispatch(
            productActions.productDeleteFailed(
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
    pageNumber: number;
    totalCount: number;
    loading: boolean;
    error: string | null;
}

const productState: ProductsState = {
    products: [],
    pageNumber: 1,
    totalCount: 1,
    loading: false,
    error: null,
};

export const productListReducer = (
    state: ProductsState = productState,
    action: ProductActions
): ProductsState => {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_LIST_REQUEST:
        case ProductActionTypes.PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ProductActionTypes.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                totalCount: action.payload.totalProducts,
                pageNumber: action.payload.pageNumber,
            };
        case ProductActionTypes.PRODUCT_LIST_FAILED:
        case ProductActionTypes.PRODUCT_DELETE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
