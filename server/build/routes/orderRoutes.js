"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var orderController_1 = require("../controllers/orderController");
var authenticateToken_1 = require("../middleware/authenticateToken");
var isAdmin_1 = require("../middleware/isAdmin");
exports.router = express_1.default.Router();
exports.router.route('/:id/pay').put(authenticateToken_1.authenticateToken, orderController_1.updateOrderToPaid);
exports.router.route('/:id/deliver').put(authenticateToken_1.authenticateToken, orderController_1.updateOrderToDeliver);
exports.router.route('/list').get(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, orderController_1.getOrderList);
exports.router
    .route('/')
    .post(authenticateToken_1.authenticateToken, orderController_1.addOrderItems)
    .get(authenticateToken_1.authenticateToken, orderController_1.getOrders);
exports.router.route('/:id').get(authenticateToken_1.authenticateToken, orderController_1.getOrderById);
