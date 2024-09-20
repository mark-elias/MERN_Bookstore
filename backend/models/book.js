"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
// make SCHEMA, basically like an INTERFACE
// this is needed for Mongoose
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishYear: { type: Number, require: true },
}, {
    timestamps: true,
});
// make Model (basically a Class)
// specify TYPE/INTERFACE
// add SCHEMA to model()
// write the name of the Collection "books"
exports.BookModel = (0, mongoose_1.model)("book", BookSchema);
