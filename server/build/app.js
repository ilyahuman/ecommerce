"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// Node modules
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var corsOptions = {
    optionsSuccessStatus: 200,
    allowedHeaders: [
        'content-type',
        'Access-Control-Allow-Origin',
        'Authorization',
        'X-Requested-With',
    ],
    origin: '*',
};
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.config = function () {
            _this.app.use(cors_1.default(corsOptions));
            _this.app.use(express_1.default.json());
            _this.app.use(express_1.default.urlencoded({ extended: true }));
            _this.app.use(morgan_1.default('dev'));
        };
        this.app = express_1.default();
        this.config();
    }
    return App;
}());
exports.App = App;
