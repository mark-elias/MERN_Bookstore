import express from "express";
import { PORT, MONGO_DB_URL } from "./config";
import mongoose from "mongoose";
import { BookModel, IBook } from "./models/book";

const app = express();
app.use(express.json());
//=======================================
app.get("/", (req, res) => {
  console.log(req);
  res.send("hello world");
});

app.get("/books", (req, res) => {
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

app.post("/books", (req, res) => {
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
    .then((savedBook) => res.status(201).send(savedBook))
    .catch((err) => {
      // Handle errors, such as validation errors
      console.log(err.message);
      res.status(400).send(err.message);
    });
});

//================================================

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("🌱 Connected to mongoDB");
    app.listen(PORT, () => console.log(`🦻 Listening on port: ${PORT}`));
  })
  .catch((err) => console.log(err));
