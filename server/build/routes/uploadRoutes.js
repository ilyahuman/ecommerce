"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var authenticateToken_1 = require("../middleware/authenticateToken");
var isAdmin_1 = require("../middleware/isAdmin");
exports.router = express_1.default.Router();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
var checkFileType = function (file, cb) {
    var fileTypes = /jpg|jpeg|png/;
    var extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    var mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb('Images only!');
    }
};
var upload = multer_1.default({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
exports.router.post('/', authenticateToken_1.authenticateToken, isAdmin_1.isAdmin, upload.single('image'), function (req, res) {
    var url = req.protocol + "://" + req.get('host') + "/";
    res.send("" + url + req.file.path);
});
