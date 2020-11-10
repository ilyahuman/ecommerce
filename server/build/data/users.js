"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mongodb_1 = require("mongodb");
exports.users = [
    {
        _id: new mongodb_1.ObjectId(),
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcryptjs_1.default.hashSync('1234', 10),
        isAdmin: true,
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: '',
        },
    },
    {
        _id: new mongodb_1.ObjectId(),
        name: 'Just test',
        email: 'test@gmail.com',
        password: bcryptjs_1.default.hashSync('1234', 10),
        isAdmin: false,
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: '',
        },
    },
];
