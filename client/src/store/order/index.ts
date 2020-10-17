import { Dispatch } from 'redux';
import { Order, OrderCreate, OrderListItem } from '../../types';

// Services
import { OrderService } from '../../services/orderService';

/**
 * * Actions
 */

enum OrderActionTypes {
    ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST',
    ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS',
    ORDER_LIST_FAILED = 'ORDER_LIST_FAILED',

    ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST',
    ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS',
    ORDER_CREATE_FAILED = 'ORDER_CREATE_FAILED',

    ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST',
    ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS',
    ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED',

    ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST',
    ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS',
    ORDER_PAY_FAILED = 'ORDER_PAY_FAILED',
    ORDER_PAY_RESET = 'ORDER_PAY_RESET',

    ORDER_CLEAR_LAST = 'ORDER_CLEAR_LAST',

    ORDER_RESET = 'ORDER_RESET',
}

interface OrderListRequestAction {
    type: OrderActionTypes.ORDER_LIST_REQUEST;
}

interface OrderListSuccessAction {
    type: OrderActionTypes.ORDER_LIST_SUCCESS;
    payload: OrderListItem[];
}

interface OrderListFailedAction {
    type: OrderActionTypes.ORDER_LIST_FAILED;
    payload: string;
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

interface OrderDetailsRequestAction {
    type: OrderActionTypes.ORDER_DETAILS_REQUEST;
}

interface OrderDetailsSuccessAction {
    type: OrderActionTypes.ORDER_DETAILS_SUCCESS;
    payload: Order;
}

interface OrderDetailsFailedAction {
    type: OrderActionTypes.ORDER_DETAILS_FAILED;
    payload: string;
}

interface OrderPayRequestAction {
    type: OrderActionTypes.ORDER_PAY_REQUEST;
}

interface OrderPaySuccessAction {
    type: OrderActionTypes.ORDER_PAY_SUCCESS;
    payload: any;
}

interface OrderPayFailedAction {
    type: OrderActionTypes.ORDER_PAY_FAILED;
    payload: string;
}

interface OrderClearLastAction {
    type: OrderActionTypes.ORDER_CLEAR_LAST;
}

interface OrderPayResetAction {
    type: OrderActionTypes.ORDER_PAY_RESET;
}

interface OrderResetAction {
    type: OrderActionTypes.ORDER_RESET;
}

type OrderActions =
    | OrderListRequestAction
    | OrderListSuccessAction
    | OrderListFailedAction
    | OrderCreateRequestAction
    | OrderCreateSuccessAction
    | OrderCreateFailedAction
    | OrderDetailsRequestAction
    | OrderDetailsSuccessAction
    | OrderDetailsFailedAction
    | OrderPayRequestAction
    | OrderPaySuccessAction
    | OrderPayFailedAction
    | OrderPayResetAction
    | OrderResetAction
    | OrderClearLastAction;

const orderListRequest = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_LIST_REQUEST,
    };
};

const orderListSuccess = function (order: OrderListItem[]): OrderActions {
    return {
        type: OrderActionTypes.ORDER_LIST_SUCCESS,
        payload: order,
    };
};

const orderListFailed = function (error: string): OrderActions {
    return {
        type: OrderActionTypes.ORDER_LIST_FAILED,
        payload: error,
    };
};

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

const orderDetailsRequest = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_DETAILS_REQUEST,
    };
};

const orderDetailsSuccess = function (order: Order): OrderActions {
    return {
        type: OrderActionTypes.ORDER_DETAILS_SUCCESS,
        payload: order,
    };
};

const orderDetailsFailed = function (error: string): OrderActions {
    return {
        type: OrderActionTypes.ORDER_DETAILS_FAILED,
        payload: error,
    };
};

const orderPayRequest = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_DETAILS_REQUEST,
    };
};

const orderPaySuccess = function (paymentResult: any): OrderActions {
    return {
        type: OrderActionTypes.ORDER_DETAILS_SUCCESS,
        payload: paymentResult,
    };
};

const orderPayFailed = function (error: string): OrderActions {
    return {
        type: OrderActionTypes.ORDER_DETAILS_FAILED,
        payload: error,
    };
};

export const orderClearLast = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_CLEAR_LAST,
    };
};

export const orderPayReset = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_PAY_RESET,
    };
};

export const orderReset = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_RESET,
    };
};

/**
 * * Async actions
 */
export const asyncGetOrders = () => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderListRequest());

        const { data } = await OrderService.getOrders();

        if (data) {
            dispatch(orderListSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderListFailed(
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

export const asyncGetOrder = (id: string) => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderDetailsRequest());

        const { data } = await OrderService.getOrderDetails(id);

        if (data) {
            dispatch(orderDetailsSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderDetailsFailed(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            )
        );
        console.error(error.message);
    }
};

export const asyncOrderPay = (id: string, paymentResult: any) => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderPayRequest());

        const { data } = await OrderService.orderPay(id, paymentResult);

        if (data) {
            dispatch(orderPaySuccess(data));
        }
    } catch (error) {
        dispatch(
            orderPayFailed(
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
        dispatch(orderReset());
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

interface OrderPayProcess {
    loading: boolean;
    success: boolean;
    error: string | null;
}

export interface OrderState {
    orders: OrderListItem[];
    lastOrder: Order | null;
    loading: boolean;
    error: string | null;
    orderPay: OrderPayProcess;
}

const orderState: OrderState = {
    orders: [],
    lastOrder: null,
    orderPay: {
        loading: false,
        success: false,
        error: null,
    },
    loading: false,
    error: null,
};

export const orderReducer = (
    state: OrderState = orderState,
    action: OrderActions
): OrderState => {
    debugger;
    switch (action.type) {
        case OrderActionTypes.ORDER_CREATE_REQUEST:
        case OrderActionTypes.ORDER_DETAILS_REQUEST:
        case OrderActionTypes.ORDER_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case OrderActionTypes.ORDER_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        }
        case OrderActionTypes.ORDER_CREATE_FAILED:
        case OrderActionTypes.ORDER_DETAILS_FAILED:
        case OrderActionTypes.ORDER_LIST_FAILED: {
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
                lastOrder: action.payload,
                // orders: [...state.orders, action.payload],
            };
        }
        case OrderActionTypes.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                lastOrder: action.payload,
            };
        case OrderActionTypes.ORDER_PAY_REQUEST:
            return {
                ...state,
                orderPay: {
                    ...state.orderPay,
                    loading: true,
                },
            };
        case OrderActionTypes.ORDER_PAY_SUCCESS:
            return {
                ...state,
                lastOrder: action.payload,
                orderPay: {
                    ...state.orderPay,
                    success: true,
                    loading: false,
                },
            };
        case OrderActionTypes.ORDER_PAY_FAILED:
            return {
                ...state,
                orderPay: {
                    ...state.orderPay,
                    error: action.payload,
                    loading: false,
                },
            };
        case OrderActionTypes.ORDER_PAY_RESET:
            return {
                ...state,
                orderPay: { loading: false, success: false, error: null },
            };
        case OrderActionTypes.ORDER_CLEAR_LAST:
            return {
                ...state,
                lastOrder: null,
            };
        case OrderActionTypes.ORDER_RESET:
            return orderState;
        default:
            return state;
    }
};
