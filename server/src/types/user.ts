import { ObjectId } from 'mongodb';

export interface UserType {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
}

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}
