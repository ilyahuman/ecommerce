"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.createProductReview = exports.deleteProductById = exports.updateProductById = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var productModel_1 = require("../models/productModel");
var userModel_1 = require("../models/userModel");
exports.getProducts = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var keyword, pageSize, pageNumber, totalCount, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyword = req.query.keyword
                    ? {
                        name: {
                            $regex: req.query.keyword,
                        },
                    }
                    : {};
                pageSize = 3;
                pageNumber = Number(req.query.pageNumber) || 1;
                return [4 /*yield*/, productModel_1.Product.find(__assign({}, keyword)).estimatedDocumentCount()];
            case 1:
                totalCount = _a.sent();
                return [4 /*yield*/, productModel_1.Product.find(__assign({}, keyword))
                        .limit(pageSize)
                        .skip(pageSize * (pageNumber - 1))];
            case 2:
                products = _a.sent();
                return [2 /*return*/, res.json({
                        products: products,
                        pageNumber: pageNumber,
                        totalProducts: Math.ceil(totalCount / pageSize),
                    })];
        }
    });
}); });
exports.getProductById = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productModel_1.Product.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (product) {
                    res.json(product);
                }
                else {
                    res.status(404);
                    throw new Error('Product not found');
                }
                return [2 /*return*/];
        }
    });
}); });
// ! Admin controllers
exports.createProduct = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, _a, name, price, image, brand, category, description, countInStock, product;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = req.user._id;
                _a = req.body, name = _a.name, price = _a.price, image = _a.image, brand = _a.brand, category = _a.category, description = _a.description, countInStock = _a.countInStock;
                product = new productModel_1.Product({
                    name: name,
                    price: price,
                    user: _id,
                    image: image,
                    brand: brand,
                    category: category,
                    description: description,
                    rating: 0,
                    numReviews: 0,
                    countInStock: countInStock,
                });
                if (!product) return [3 /*break*/, 2];
                return [4 /*yield*/, product.save()];
            case 1:
                _b.sent();
                res.status(201).json(product);
                _b.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
exports.updateProductById = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, productModel_1.Product.findByIdAndUpdate(id, req.body, {
                        new: true,
                    })];
            case 1:
                product = _a.sent();
                if (product) {
                    res.status(201).json(product);
                }
                else {
                    res.status(404);
                    throw new Error('Product not found');
                }
                return [2 /*return*/];
        }
    });
}); });
exports.deleteProductById = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, productModel_1.Product.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (!product) return [3 /*break*/, 3];
                return [4 /*yield*/, product.remove()];
            case 2:
                _a.sent();
                res.json({ message: 'Product has been removed' });
                return [3 /*break*/, 4];
            case 3:
                res.status(404);
                throw new Error('Product not found');
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.createProductReview = express_async_handler_1.default(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, rating, comment, _id, product, user, review;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, rating = _a.rating, comment = _a.comment;
                _id = req.user._id;
                return [4 /*yield*/, productModel_1.Product.findById(req.params.id)];
            case 1:
                product = _b.sent();
                if (!product) return [3 /*break*/, 4];
                return [4 /*yield*/, userModel_1.User.findById(_id)];
            case 2:
                user = _b.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                review = {
                    user: _id,
                    name: user.name,
                    rating: Number(rating),
                    comment: comment,
                };
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating =
                    product.reviews.reduce(function (acc, review) { return acc + review.rating; }, 0) / product.numReviews;
                return [4 /*yield*/, product.save()];
            case 3:
                _b.sent();
                if (product) {
                    res.status(201).json(product);
                }
                return [3 /*break*/, 5];
            case 4:
                res.status(404);
                throw new Error('Product not found');
            case 5: return [2 /*return*/];
        }
    });
}); });
