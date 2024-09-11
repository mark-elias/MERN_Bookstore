import express, { Request, Response } from "express";
import { PORT, MONGO_DB_URL } from "./config";
import mongoose from "mongoose";
import { BookModel, IBook } from "./models/book";
import Joi from "joi";

const app = express();
app.use(express.json());
// ====== Joi Validation ==========================
// make Joi schema using Book INTERFACE
// for creating/Post
const createBookSchema = Joi.object<IBook>({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishYear: Joi.number().required(),
});
//
const updateBookSchema = Joi.object<IBook>({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  publishYear: Joi.number().optional(),
}).min(1); // Ensure at least one field is being updated
//======= Endpoints =======================
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
// get ALL books
app.get("/books", (req: Request, res: Response) => {
  BookModel.find({})
    .then((books) =>
      res.status(200).json({
        count: books.length,
        data: books,
      })
    )
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
});
// get ONE book
app.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  BookModel.findById(id)
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
app.post("/books", (req: Request, res: Response) => {
  // Validate request body against the Joi schema
  const { error } = createBookSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send(`Validation error: ${error.details[0].message}`);
  }

  // make a new object
  // get req.body values for object
  const newBook: IBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
  };

  // make a new instance of BookModel
  // using the object you created
  const book = new BookModel(newBook);

  //save the book object/instance to the Database
  book
    .save()
    .then((savedBook) =>
      res.status(201).json({
        message: "The book was added to the database",
        data: savedBook,
      })
    )
    .catch((err) => {
      // Handle errors, such as validation errors
      console.log(err.message);
      res.status(400).send(err.message);
    });
});
// Update a single book
app.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate request body against the Joi schema
  const { error } = updateBookSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send(`Validation error: ${error.details[0].message}`);
  }

  BookModel.findByIdAndUpdate(id, req.body)
    .then((book) => {
      if (!book) {
        return res.status(404).send("Book not found");
      } else if (!req.body) {
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
app.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  BookModel.findByIdAndDelete(id)
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
//================================================

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("🌱 Connected to mongoDB");
    app.listen(PORT, () => console.log(`🦻 Listening on port: ${PORT}`));
  })
  .catch((err) => console.log(err));
