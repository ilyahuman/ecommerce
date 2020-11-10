import { ObjectId } from 'mongodb';

export interface OrderItemType {
    _id: ObjectId;
    name: string;
    qty: number;
    image: string;
    price: number;
}

export interface OrderType {
    _id: ObjectId;
    user: ObjectId;
    orderItems: [OrderItemType];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    paymentResult: {
        id: string;
        status: string;
        update_time: string;
        email_address: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    isPlaced: boolean;
    paidAt: Date;
    deliveredAt: Date;
}
