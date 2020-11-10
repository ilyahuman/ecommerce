"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderToDeliver = exports.getOrderList = exports.updateOrderToPaid = exports.getOrderById = exports.getOrders = exports.addOrderItems = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var orderModel_1 = require("../models/orderModel");
exports.addOrderItems = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, _a, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, createdOrder;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = req.user._id;
                _a = req.body, orderItems = _a.orderItems, shippingAddress = _a.shippingAddress, paymentMethod = _a.paymentMethod, itemsPrice = _a.itemsPrice, taxPrice = _a.taxPrice, shippingPrice = _a.shippingPrice, totalPrice = _a.totalPrice;
                if (!req.user) {
                    res.status(401);
                    throw new Error('Unauthorized!');
                }
                if (orderItems && orderItems.length === 0) {
                    res.status(400);
                    throw new Error('There are no orders');
                }
                return [4 /*yield*/, orderModel_1.Order.create({
                        user: _id,
                        orderItems: orderItems,
                        shippingAddress: shippingAddress,
                        paymentMethod: paymentMethod,
                        itemsPrice: itemsPrice,
                        taxPrice: taxPrice,
                        shippingPrice: shippingPrice,
                        totalPrice: totalPrice,
                    })];
            case 1:
                createdOrder = _b.sent();
                res.status(201).json({
                    _id: createdOrder._id,
                    orderItems: createdOrder.orderItems,
                    shippingAddress: createdOrder.shippingAddress,
                    paymentMethod: createdOrder.paymentMethod,
                    itemsPrice: createdOrder.itemsPrice,
                    taxPrice: createdOrder.taxPrice,
                    shippingPrice: createdOrder.shippingPrice,
                    totalPrice: createdOrder.totalPrice,
                    user: createdOrder.user,
                    isPlaced: createdOrder.isPlaced,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getOrders = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                return [4 /*yield*/, orderModel_1.Order.find({ user: _id }, [
                        '_id',
                        'createdAt',
                        'totalPrice',
                        'isPaid',
                        'paidAt',
                        'deliveredAt',
                        'isDelivered',
                    ])];
            case 1:
                orders = _a.sent();
                if (orders) {
                    res.status(200).send(orders);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getOrderById = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, orderModel_1.Order.findById(id).populate('user', 'name email')];
            case 1:
                order = _a.sent();
                if (order) {
                    res.status(200).send({
                        _id: order._id,
                        orderItems: order.orderItems,
                        shippingAddress: order.shippingAddress,
                        paymentMethod: order.paymentMethod,
                        itemsPrice: order.itemsPrice,
                        taxPrice: order.taxPrice,
                        shippingPrice: order.shippingPrice,
                        totalPrice: order.totalPrice,
                        user: order.user,
                        isPlaced: order.isPlaced,
                        isPaid: order.isPaid,
                        isDelivered: order.isDelivered,
                        paidAt: order.paidAt,
                        deliveredAt: order.deliveredAt,
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.updateOrderToPaid = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, paymentResult, updatedOrder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, orderModel_1.Order.findById(id).populate('user', 'name email')];
            case 1:
                order = _a.sent();
                paymentResult = req.body.paymentResult;
                if (!(order && paymentResult)) return [3 /*break*/, 3];
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: paymentResult.id,
                    status: paymentResult.status,
                    update_time: paymentResult.update_time,
                    email_address: paymentResult.payer.email_address,
                };
                return [4 /*yield*/, order.save()];
            case 2:
                updatedOrder = _a.sent();
                res.json({
                    _id: updatedOrder._id,
                    orderItems: updatedOrder.orderItems,
                    shippingAddress: updatedOrder.shippingAddress,
                    paymentMethod: updatedOrder.paymentMethod,
                    itemsPrice: updatedOrder.itemsPrice,
                    taxPrice: updatedOrder.taxPrice,
                    shippingPrice: updatedOrder.shippingPrice,
                    totalPrice: updatedOrder.totalPrice,
                    user: updatedOrder.user,
                    isPlaced: updatedOrder.isPlaced,
                    isPaid: updatedOrder.isPaid,
                    isDelivered: updatedOrder.isDelivered,
                    paidAt: updatedOrder.paidAt,
                    deliveredAt: updatedOrder.deliveredAt,
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.getOrderList = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orderModel_1.Order.find({}).populate('user', ['name', 'email'])];
            case 1:
                orders = _a.sent();
                if (orders) {
                    res.status(200).send(orders);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.updateOrderToDeliver = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, updatedOrder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, orderModel_1.Order.findById(id)];
            case 1:
                order = _a.sent();
                if (!order) return [3 /*break*/, 3];
                order.isDelivered = true;
                order.deliveredAt = Date.now();
                return [4 /*yield*/, order.save()];
            case 2:
                updatedOrder = _a.sent();
                res.json({
                    _id: updatedOrder._id,
                    orderItems: updatedOrder.orderItems,
                    shippingAddress: updatedOrder.shippingAddress,
                    paymentMethod: updatedOrder.paymentMethod,
                    itemsPrice: updatedOrder.itemsPrice,
                    taxPrice: updatedOrder.taxPrice,
                    shippingPrice: updatedOrder.shippingPrice,
                    totalPrice: updatedOrder.totalPrice,
                    user: updatedOrder.user,
                    isPlaced: updatedOrder.isPlaced,
                    isPaid: updatedOrder.isPaid,
                    isDelivered: updatedOrder.isDelivered,
                    paidAt: updatedOrder.paidAt,
                    deliveredAt: updatedOrder.deliveredAt,
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
