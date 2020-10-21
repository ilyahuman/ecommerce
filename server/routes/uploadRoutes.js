import path from 'path';
import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { isAdmin } from '../middleware/isAdmin.js';

export const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.originalname}-${Date.now()}${path.extname(
                file.originalname
            )}`
        );
    },
});

const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
};

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

router.post(
    '/',
    authenticateToken,
    isAdmin,
    upload.single('image'),
    (req, res) => {
        const url = `${req.protocol}://${req.get('host')}/`;
        res.send(`${url}${req.file.path}`);
    }
);
