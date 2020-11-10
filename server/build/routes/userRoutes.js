"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var authenticateToken_1 = require("../middleware/authenticateToken");
var isAdmin_1 = require("../middleware/isAdmin");
exports.router = express_1.default.Router();
exports.router.post('/signin', userController_1.signIn);
exports.router.route('/').get(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, userController_1.getAllUsers).post(userController_1.signUp);
exports.router
    .route('/user')
    .get(authenticateToken_1.authenticateToken, userController_1.getUserDetails)
    .put(authenticateToken_1.authenticateToken, userController_1.updateUser);
exports.router
    .route('/:id')
    .get(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, userController_1.getUserById)
    .put(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, userController_1.updateUserById)
    .delete(authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, userController_1.deleteUserById);
