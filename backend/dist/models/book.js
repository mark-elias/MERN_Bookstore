"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishYear: { type: Number, require: true },
}, {
    timestamps: true,
});
exports.BookModel = (0, mongoose_1.model)("book", BookSchema);
