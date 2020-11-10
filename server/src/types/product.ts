import { ObjectId } from 'mongodb';

export interface ReviewType {
    _id?: ObjectId;
    name: string;
    rating: number;
    comment: string;
    user: ObjectId;
}

export interface ProductType {
    _id: ObjectId;
    user: ObjectId;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
    reviews: ReviewType[];
}
