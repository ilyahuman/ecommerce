"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.generateToken = function (user) {
    return jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5d',
    });
};
