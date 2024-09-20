"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const book_1 = require("../models/book");
const router = express_1.default.Router();
// ====== Joi Validation ==========================
// make Joi schema using Book INTERFACE
// for creating/Post
const createBookSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    publishYear: joi_1.default.number().required(),
});
//
const updateBookSchema = joi_1.default.object({
    title: joi_1.default.string().optional(),
    author: joi_1.default.string().optional(),
    publishYear: joi_1.default.number().optional(),
}).min(1); // Ensure at least one field is being updated
//======= Endpoints =======================
// get ALL books
router.get("/", (req, res) => {
    book_1.BookModel.find({})
        .then((books) => res.status(200).json(books
    // {
    // count: books.length,
    // data: books,
    // }
    ))
        .catch((err) => {
        console.log(err.message);
        res.status(500).send(err.message);
    });
});
// get ONE book
router.get("/:id", (req, res) => {
    const { id } = req.params;
    book_1.BookModel.findById(id)
        .then((book) => {
        if (!book) {
            return res.status(404).send("book not found");
        }
        res.status(200).json(book);
    })
        .catch((err) => {
        console.log(err.message);
        res.status(500).send(err.message);
    });
});
// Add a book
router.post("/", (req, res) => {
    // Validate request body against the Joi schema
    const { error } = createBookSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .send(`Validation error: ${error.details[0].message}`);
    }
    // make a new object
    // get req.body values for object
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    };
    // make a new instance of BookModel
    // using the object you created
    const book = new book_1.BookModel(newBook);
    //save the book object/instance to the Database
    book
        .save()
        .then((savedBook) => res.status(201).json({
        message: "The book was added to the database",
        data: savedBook,
    }))
        .catch((err) => {
        // Handle errors, such as validation errors
        console.log(err.message);
        res.status(400).send(err.message);
    });
});
// Update a single book
router.put("/:id", (req, res) => {
    const { id } = req.params;
    // Validate request body against the Joi schema
    const { error } = updateBookSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .send(`Validation error: ${error.details[0].message}`);
    }
    book_1.BookModel.findByIdAndUpdate(id, req.body)
        .then((book) => {
        if (!book) {
            return res.status(404).send("Book not found");
        }
        else if (!req.body) {
            return res.status(400).send("You didnt send the correct info");
        }
        res.status(200).json({
            message: "Book was updated successfuly",
            book: book,
        });
    })
        .catch((err) => res.status(500).send(err.message));
});
// router for deleting a book
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    book_1.BookModel.findByIdAndDelete(id)
        .then((book) => {
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res
            .status(200)
            .json({ message: "Book deleted successfulyy", book: book });
    })
        .catch((err) => res.status(500).send(err.message));
});
//=======================================
exports.default = router;
