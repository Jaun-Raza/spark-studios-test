import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

export const Router = express.Router();

const items = [
    {
        id: 0,
        name: "Item 1",
        price: 10.99
    },
    {
        id: 1,
        name: "Item 2",
        price: 9.99
    },
    {
        id: 2,
        name: "Item 3",
        price: 12.99
    },
    {
        id: 3,
        name: "Item 4",
        price: 14.99
    }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

Router.route('/items').get((req, res) => {
    try {
        res.status(200).json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})
