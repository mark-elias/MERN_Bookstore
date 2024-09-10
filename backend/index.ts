import express from "express";
import { PORT, MONGO_DB_URL } from "./config";
import mongoose from "mongoose";
import { BookModel, IBook } from "./models/book";

const app = express();
app.use(express.json());
//===========================
app.get("/", (req, res) => {
  console.log(req);
  res.send("hello world");
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
      res.status(400).json({ message: err.message });
      console.log("holyyyy");
    });
});

//=============================

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("🌱 Connected to mongoDB");
    app.listen(PORT, () => console.log(`🦻 Listening on port: ${PORT}`));
  })
  .catch((err) => console.log(err));
