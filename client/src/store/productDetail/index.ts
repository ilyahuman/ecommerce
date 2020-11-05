import { Dispatch } from 'redux';
import { Product } from '../../types/index';
import { InferValueTypes } from '../../utils/inferTypes';

// Services
import { ProductService } from '../../services/productService';

/**
 * * Actions
 */

enum ProductActionTypes {
    PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST',
    PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS',
    PRODUCT_DETAIL_FAILED = 'PRODUCT_DETAIL_FAILED',
}

const productDetailActions = {
    productRequest: () => {
        return {
            type: ProductActionTypes.PRODUCT_DETAIL_REQUEST,
        } as const;
    },

    productSuccess: (product: Product) => {
        return {
            type: ProductActionTypes.PRODUCT_DETAIL_SUCCESS,
            payload: product,
        } as const;
    },

    productFailed: (error: string) => {
        return {
            type: ProductActionTypes.PRODUCT_DETAIL_FAILED,
            payload: error,
        } as const;
    },
};

type ProductDetailActions = ReturnType<
    InferValueTypes<typeof productDetailActions>
>;

/**
 * * Async actions
 */

export const asyncGetProduct = (id: string) => async (
    dispatch: Dispatch<ProductDetailActions>
) => {
    try {
        dispatch(productDetailActions.productRequest());

        const { data } = await ProductService.getProductById(id);

        if (data) {
            dispatch(productDetailActions.productSuccess(data));
        }
    } catch (error) {
        dispatch(
            productDetailActions.productFailed(
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

export interface ProductDetailState {
    product: Product;
    loading: boolean;
    error: string | null;
}

const productState: ProductDetailState = {
    product: {} as Product,
    loading: false,
    error: null,
};

export const productDetailReducer = (
    state: ProductDetailState = productState,
    action: ProductDetailActions
): ProductDetailState => {
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
};
