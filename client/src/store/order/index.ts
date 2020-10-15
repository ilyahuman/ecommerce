import { Dispatch } from 'redux';
import axios from 'axios';
import { Order } from '../../types';

import { StoreRootState } from '../index';

// Services
import { OrderService } from '../../services/orderService';

/**
 * * Actions
 */

enum OrderActionTypes {
    ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST',
    ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS',
    ORDER_CREATE_FAILED = 'ORDER_CREATE_FAILED',

    ORDER_CLEAR_LAST = 'ORDER_CLEAR_LAST',
}

interface OrderCreateRequestAction {
    type: OrderActionTypes.ORDER_CREATE_REQUEST;
}

interface OrderCreateSuccessAction {
    type: OrderActionTypes.ORDER_CREATE_SUCCESS;
    payload: Order;
}

interface OrderCreateFailedAction {
    type: OrderActionTypes.ORDER_CREATE_FAILED;
    payload: string;
}

interface orderClearLastAction {
    type: OrderActionTypes.ORDER_CLEAR_LAST;
}

type OrderActions =
    | OrderCreateRequestAction
    | OrderCreateSuccessAction
    | OrderCreateFailedAction
    | orderClearLastAction;

const orderCrerateRequest = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_CREATE_REQUEST,
    };
};

const orderCrerateSuccess = function (order: Order): OrderActions {
    return {
        type: OrderActionTypes.ORDER_CREATE_SUCCESS,
        payload: order,
    };
};

const orderCrerateFailed = function (error: string): OrderActions {
    return {
        type: OrderActionTypes.ORDER_CREATE_FAILED,
        payload: error,
    };
};

export const orderClearLast = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_CLEAR_LAST,
    };
};

/**
 * * Async actions
 */

export const asyncOrderCreate = (order: Order) => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderCrerateRequest());

        const { data } = await OrderService.createOrder(order);

        if (data) {
            dispatch(orderCrerateSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderCrerateFailed(
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

export interface OrderState {
    orders: Order[];
    lastOrder: Order | null;
    loading: boolean;
    error: string | null;
}

const orderState: OrderState = {
    orders: [],
    lastOrder: {} as Order,
    loading: false,
    error: null,
};

export const orderReducer = (
    state: OrderState = orderState,
    action: OrderActions
): OrderState => {
    switch (action.type) {
        case OrderActionTypes.ORDER_CREATE_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case OrderActionTypes.ORDER_CREATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                lastOrder: action.payload,
                orders: [...state.orders, action.payload],
            };
        }
        case OrderActionTypes.ORDER_CREATE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case OrderActionTypes.ORDER_CLEAR_LAST:
            return {
                ...state,
                lastOrder: null,
            };
        default:
            return state;
    }
};
