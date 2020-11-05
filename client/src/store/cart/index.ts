import { Dispatch } from 'redux';
import axios from 'axios';
import { CartProduct, Product } from '../../types';
import { storage } from '../../utils/simplePersistence';
import { InferValueTypes } from '../../utils/inferTypes';

import { StoreRootState } from '../index';

/**
 * * Actions
 */

enum CartActionTypes {
    CART_ADD_PRODUCT = 'CART_ADD_PRODUCT',
    CART_REMOVE_PRODUCT = 'CART_REMOVE_PRODUCT',
    CART_RESET = 'CART_RESET',
    CART_ADD_PAYMENT_METHOD = 'CART_ADD_PAYMENT_METHOD',
}

const cartActions = {
    cartAddProduct: (product: CartProduct) => {
        return {
            type: CartActionTypes.CART_ADD_PRODUCT,
            payload: product,
        } as const;
    },

    cartRemoveProduct: (id: string) => {
        return {
            type: CartActionTypes.CART_REMOVE_PRODUCT,
            payload: id,
        } as const;
    },

    cartAddPaymentMethod: (paymentMethod: string) => {
        return {
            type: CartActionTypes.CART_ADD_PAYMENT_METHOD,
            payload: paymentMethod,
        } as const;
    },

    cartReset: () => {
        return {
            type: CartActionTypes.CART_RESET,
        } as const;
    },
};

export type CartActions = ReturnType<InferValueTypes<typeof cartActions>>;

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
                cartActions.cartAddProduct({
                    _id: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty,
                })
            );

            storage.setItem('cartItems', getState().cart.cartItems);
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
        dispatch(cartActions.cartAddPaymentMethod(paymentMethod));

        storage.setItem('paymentMethod', getState().cart.paymentMethod);
    } catch (error) {
        console.error(error.message);
    }
};

export const asyncRemoveCartProduct = (id: string) => async (
    dispatch: Dispatch<CartActions>,
    getState: () => StoreRootState
) => {
    try {
        dispatch(cartActions.cartRemoveProduct(id));

        storage.setItem('paymentMethod', getState().cart.paymentMethod);
    } catch (error) {
        console.error(error.message);
    }
};

export const asyncCartReset = () => async (dispatch: Dispatch<CartActions>) => {
    try {
        dispatch(cartActions.cartReset());

        storage.removeItem('cartItems').removeItem('paymentMethod');
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
                return product._id === item._id;
            });

            if (isExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((product: CartProduct) => {
                        return product._id === isExist._id ? item : product;
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
                    (product: CartProduct) => action.payload !== product._id
                ),
            };
        case CartActionTypes.CART_ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case CartActionTypes.CART_RESET:
            return cartState;
        default:
            return state;
    }
};
