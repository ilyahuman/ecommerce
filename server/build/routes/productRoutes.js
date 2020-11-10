"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var productController_1 = require("../controllers/productController");
var authenticateToken_1 = require("../middleware/authenticateToken");
var isAdmin_1 = require("../middleware/isAdmin");
exports.router = express_1.default.Router();
exports.router
    .route('/:id')
    .get(productController_1.getProductById)
    .delete(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, productController_1.deleteProductById)
    .put(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, productController_1.updateProductById);
exports.router.route('/:id/reviews').post(authenticateToken_1.authenticateToken, productController_1.createProductReview);
exports.router.route('/').post(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, productController_1.createProduct);
exports.router.get('/', productController_1.getProducts);
