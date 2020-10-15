import { Dispatch } from 'redux';
import axios from 'axios';
import { CartProduct, Product } from '../../types';

import { StoreRootState } from '../index';

/**
 * * Actions
 */

enum CartActionTypes {
    CART_ADD_PRODUCT = 'CART_ADD_PRODUCT',
    CART_REMOVE_PRODUCT = 'CART_REMOVE_PRODUCT',

    CART_ADD_PAYMENT_METHOD = 'CART_ADD_PAYMENT_METHOD',
}

interface CartAddProduct {
    type: CartActionTypes.CART_ADD_PRODUCT;
    payload: CartProduct;
}

interface CartRemoveProduct {
    type: CartActionTypes.CART_REMOVE_PRODUCT;
    payload: string;
}

interface CartAddPaymentMethod {
    type: CartActionTypes.CART_ADD_PAYMENT_METHOD;
    payload: string;
}

type CartActions = CartAddProduct | CartRemoveProduct | CartAddPaymentMethod;

const cartAddProduct = function (product: CartProduct): CartActions {
    return {
        type: CartActionTypes.CART_ADD_PRODUCT,
        payload: product,
    };
};

const cartRemoveProduct = function (id: string): CartActions {
    return {
        type: CartActionTypes.CART_REMOVE_PRODUCT,
        payload: id,
    };
};

export const cartAddPaymentMethod = function (
    paymentMethod: string
): CartActions {
    return {
        type: CartActionTypes.CART_ADD_PAYMENT_METHOD,
        payload: paymentMethod,
    };
};

/**
 * * Async actions
 */

export const asyncAddCartProduct = (id: string, qty: number) => async (
    dispatch: Dispatch<CartActions>,
    getState: () => StoreRootState
) => {
    try {
        const { data } = await axios.get<Product>(
            `http://localhost:5000/api/products/${id}`
        );

        if (data) {
            dispatch(
                cartAddProduct({
                    id: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty,
                })
            );

            localStorage.setItem(
                'cartItems',
                JSON.stringify(getState().cart.cartItems)
            );
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const asyncCartAddPaymentMethod = (paymentMethod: string) => async (
    dispatch: Dispatch<CartActions>,
    getState: () => StoreRootState
) => {
    try {
        dispatch(cartAddPaymentMethod(paymentMethod));

        localStorage.setItem(
            'paymentMethod',
            JSON.stringify(getState().cart.paymentMethod)
        );
    } catch (error) {
        console.error(error.message);
    }
};

export const asyncRemoveCartProduct = (id: string) => async (
    dispatch: Dispatch<CartActions>,
    getState: () => StoreRootState
) => {
    try {
        dispatch(cartRemoveProduct(id));

        localStorage.setItem(
            'cartItems',
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * * Reducer
 *
 * @param state
 * @param action
 */

export interface CartState {
    cartItems: CartProduct[];
    paymentMethod: string | null;
}

const cartState: CartState = {
    cartItems: [],
    paymentMethod: null,
};

export const cartReducer = (
    state: CartState = cartState,
    action: CartActions
): CartState => {
    switch (action.type) {
        case CartActionTypes.CART_ADD_PRODUCT:
            const item = action.payload;
            const isExist = state.cartItems.find((product: CartProduct) => {
                return product.id === item.id;
            });

            if (isExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((product: CartProduct) => {
                        return product.id === isExist.id ? item : product;
                    }),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case CartActionTypes.CART_REMOVE_PRODUCT:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (product: CartProduct) => action.payload !== product.id
                ),
            };
        case CartActionTypes.CART_ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        default:
            return state;
    }
};
