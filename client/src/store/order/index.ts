import { Dispatch } from 'redux';
import {
    Order,
    OrderCreate,
    OrderUserListItem,
    OrderAdminListItem,
} from '../../types';

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

interface OrderUserListRequestAction {
    type: OrderActionTypes.ORDER_USER_LIST_REQUEST;
}

interface OrderUserListSuccessAction {
    type: OrderActionTypes.ORDER_USER_LIST_SUCCESS;
    payload: OrderUserListItem[];
}

interface OrderUserListFailedAction {
    type: OrderActionTypes.ORDER_USER_LIST_FAILED;
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

interface OrderClearLastAction {
    type: OrderActionTypes.ORDER_CLEAR_LAST;
}

interface OrderResetAction {
    type: OrderActionTypes.ORDER_RESET;
}

// !Admin
interface OrderAdminListRequestAction {
    type: OrderActionTypes.ORDER_ADMIN_LIST_REQUEST;
}

interface OrderAdminListSuccessAction {
    type: OrderActionTypes.ORDER_ADMIN_LIST_SUCCESS;
    payload: OrderAdminListItem[];
}

interface OrderAdminListFailedAction {
    type: OrderActionTypes.ORDER_ADMIN_LIST_FAILED;
    payload: string;
}

type OrderActions =
    | OrderUserListRequestAction
    | OrderUserListSuccessAction
    | OrderUserListFailedAction
    | OrderCreateRequestAction
    | OrderCreateSuccessAction
    | OrderCreateFailedAction
    | OrderDetailsRequestAction
    | OrderDetailsSuccessAction
    | OrderDetailsFailedAction
    | OrderResetAction
    | OrderClearLastAction
    | OrderAdminListRequestAction
    | OrderAdminListSuccessAction
    | OrderAdminListFailedAction;

const orderUserListRequest = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_USER_LIST_REQUEST,
    };
};

const orderUserListSuccess = function (
    order: OrderUserListItem[]
): OrderActions {
    return {
        type: OrderActionTypes.ORDER_USER_LIST_SUCCESS,
        payload: order,
    };
};

const orderUserListFailed = function (error: string): OrderActions {
    return {
        type: OrderActionTypes.ORDER_USER_LIST_FAILED,
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

export const orderReset = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_RESET,
    };
};

// !Admin
const orderAdminListRequest = function (): OrderActions {
    return {
        type: OrderActionTypes.ORDER_ADMIN_LIST_REQUEST,
    };
};

const orderAdminListSuccess = function (
    order: OrderAdminListItem[]
): OrderActions {
    return {
        type: OrderActionTypes.ORDER_ADMIN_LIST_SUCCESS,
        payload: order,
    };
};

const orderAdminListFailed = function (error: string): OrderActions {
    return {
        type: OrderActionTypes.ORDER_ADMIN_LIST_FAILED,
        payload: error,
    };
};

/**
 * * Async actions
 */
export const asyncGetOrders = () => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderUserListRequest());

        const { data } = await OrderService.getOrders();

        if (data) {
            dispatch(orderUserListSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderUserListFailed(
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

export const asyncOrderReset = () => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderReset());
    } catch (error) {
        console.error(error.message);
    }
};

export const asyncGetOrderUserList = () => async (
    dispatch: Dispatch<OrderActions>
) => {
    try {
        dispatch(orderAdminListRequest());

        const { data } = await OrderService.getOrderList();

        if (data) {
            dispatch(orderAdminListSuccess(data));
        }
    } catch (error) {
        dispatch(
            orderAdminListFailed(
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
