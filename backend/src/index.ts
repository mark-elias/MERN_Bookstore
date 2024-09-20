import express, { Request, Response } from "express";
import { PORT, MONGO_DB_URL } from "./config";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://mern-bookstore-olive.vercel.app/", // Replace with your actual Vercel frontend URL
  })
);
app.use("/books", booksRoute);
//================================================
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
//========================================
// Ensure MONGO_DB_URL is defined
if (!MONGO_DB_URL) {
  throw new Error("MONGO_DB_URL is not defined in the environment variables.");
}

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("🌱 Connected to mongoDB");
    app.listen(PORT, () => console.log(`🦻 Listening on port: ${PORT}`));
  })
  .catch((err) => console.log(err));
