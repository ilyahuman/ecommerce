import { Dispatch } from 'redux';
import {
    Order,
    OrderCreate,
    OrderUserListItem,
    OrderAdminListItem,
} from '../../types';
import { InferValueTypes } from '../../utils/inferTypes';

// Services
import { OrderService } from '../../services/orderService';

/**
 * * Actions
 */

enum OrderActionTypes {
    ORDER_USER_LIST_REQUEST = 'ORDER_USER_LIST_REQUEST',
    ORDER_USER_LIST_SUCCESS = 'ORDER_USER_LIST_SUCCESS',
    ORDER_USER_LIST_FAILED = 'ORDER_USER_LIST_FAILED',

    ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST',
    ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS',
    ORDER_CREATE_FAILED = 'ORDER_CREATE_FAILED',

    ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST',
    ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS',
    ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED',

    ORDER_CLEAR_LAST = 'ORDER_CLEAR_LAST',

    ORDER_RESET = 'ORDER_RESET',

    ORDER_ADMIN_LIST_REQUEST = 'ORDER_ADMIN_LIST_REQUEST',
    ORDER_ADMIN_LIST_SUCCESS = 'ORDER_ADMIN_LIST_SUCCESS',
    ORDER_ADMIN_LIST_FAILED = 'ORDER_ADMIN_LIST_FAILED',
}

export const orderActions = {
    orderUserListRequest: () => {
        return {
            type: OrderActionTypes.ORDER_USER_LIST_REQUEST,
        } as const;
    },

    orderUserListSuccess: (order: OrderUserListItem[]) => {
        return {
            type: OrderActionTypes.ORDER_USER_LIST_SUCCESS,
            payload: order,
        } as const;
    },

    orderUserListFailed: (error: string) => {
        return {
            type: OrderActionTypes.ORDER_USER_LIST_FAILED,
            payload: error,
        } as const;
    },

    orderCrerateRequest: () => {
        return {
            type: OrderActionTypes.ORDER_CREATE_REQUEST,
        } as const;
    },

    orderCrerateSuccess: (order: Order) => {
        return {
            type: OrderActionTypes.ORDER_CREATE_SUCCESS,
            payload: order,
        } as const;
    },

    orderCrerateFailed: (error: string) => {
        return {
            type: OrderActionTypes.ORDER_CREATE_FAILED,
            payload: error,
        } as const;
    },

    orderDetailsRequest: () => {
        return {
            type: OrderActionTypes.ORDER_DETAILS_REQUEST,
        } as const;
    },

    orderDetailsSuccess: (order: Order) => {
        return {
            type: OrderActionTypes.ORDER_DETAILS_SUCCESS,
            payload: order,
        } as const;
    },

    orderDetailsFailed: (error: string) => {
        return {
            type: OrderActionTypes.ORDER_DETAILS_FAILED,
            payload: error,
        } as const;
    },

    orderPayRequest: () => {
        return {
            type: OrderActionTypes.ORDER_DETAILS_REQUEST,
        } as const;
    },

    orderPaySuccess: (paymentResult: any) => {
        return {
            type: OrderActionTypes.ORDER_DETAILS_SUCCESS,
            payload: paymentResult,
        } as const;
    },

    orderPayFailed: (error: string) => {
        return {
            type: OrderActionTypes.ORDER_DETAILS_FAILED,
            payload: error,
        } as const;
    },

    orderClearLast: () => {
        return {
            type: OrderActionTypes.ORDER_CLEAR_LAST,
        } as const;
    },

    orderReset: () => {
        return {
            type: OrderActionTypes.ORDER_RESET,
        } as const;
    },

    orderAdminListRequest: () => {
        return {
            type: OrderActionTypes.ORDER_ADMIN_LIST_REQUEST,
        } as const;
    },

    orderAdminListSuccess: (order: OrderAdminListItem[]) => {
        return {
            type: OrderActionTypes.ORDER_ADMIN_LIST_SUCCESS,
            payload: order,
        } as const;
    },

    orderAdminListFailed: (error: string) => {
        return {
            type: OrderActionTypes.ORDER_ADMIN_LIST_FAILED,
            payload: error,
        } as const;
    },
};

type OrderActions = ReturnType<InferValueTypes<typeof orderActions>>;

/**
 * * Async actions
 */

export const asyncGetOrders = () => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderActions.orderUserListRequest());

        const { data } = await OrderService.getOrders();

        if (data) {
            dispatch(orderActions.orderUserListSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderActions.orderUserListFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncOrderCreate = (order: OrderCreate) => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderActions.orderCrerateRequest());

        const { data } = await OrderService.createOrder(order);

        if (data) {
            dispatch(orderActions.orderCrerateSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderActions.orderCrerateFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncGetOrder = (id: string) => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderActions.orderDetailsRequest());

        const { data } = await OrderService.getOrderDetails(id);

        if (data) {
            dispatch(orderActions.orderDetailsSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderActions.orderDetailsFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncOrderReset = () => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderActions.orderReset());
    } catch (error) {
        console.error(error.message);
    }
};

export const asyncGetOrderUserList = () => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderActions.orderAdminListRequest());

        const { data } = await OrderService.getOrderList();

        if (data) {
            dispatch(orderActions.orderAdminListSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderActions.orderAdminListFailed(
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
    orders: OrderUserListItem[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
}

const orderState: OrderState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
};

export const orderReducer = (
    state: OrderState = orderState,
    action: OrderActions
): OrderState => {
    switch (action.type) {
        case OrderActionTypes.ORDER_CREATE_REQUEST:
        case OrderActionTypes.ORDER_DETAILS_REQUEST:
        case OrderActionTypes.ORDER_USER_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case OrderActionTypes.ORDER_USER_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        }
        case OrderActionTypes.ORDER_CREATE_FAILED:
        case OrderActionTypes.ORDER_DETAILS_FAILED:
        case OrderActionTypes.ORDER_USER_LIST_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case OrderActionTypes.ORDER_CREATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                currentOrder: action.payload,
                // orders: [...state.orders, action.payload],
            };
        }
        case OrderActionTypes.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                currentOrder: action.payload,
            };
        case OrderActionTypes.ORDER_CLEAR_LAST:
            return {
                ...state,
                currentOrder: null,
            };
        case OrderActionTypes.ORDER_RESET:
            return orderState;
        default:
            return state;
    }
};

// !Admin TODO
export interface OrderListState {
    orderList: OrderAdminListItem[];
    loading: boolean;
    error: string | null;
}

const orderListState: OrderListState = {
    orderList: [],
    loading: false,
    error: null,
};

export const orderListReducer = (
    state: OrderListState = orderListState,
    action: OrderActions
): OrderListState => {
    switch (action.type) {
        case OrderActionTypes.ORDER_ADMIN_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case OrderActionTypes.ORDER_ADMIN_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: action.payload,
            };
        case OrderActionTypes.ORDER_ADMIN_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
