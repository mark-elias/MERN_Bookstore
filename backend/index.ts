import express, { Request, Response } from "express";
import { PORT, MONGO_DB_URL } from "./config";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute";

const app = express();
app.use(express.json());
app.use("/books", booksRoute);
//================================================
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
//========================================
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("🌱 Connected to mongoDB");
    app.listen(PORT, () => console.log(`🦻 Listening on port: ${PORT}`));
  })
  .catch((err) => console.log(err));
