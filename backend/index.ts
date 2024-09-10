import express from "express";
import { PORT, MONGO_DB_URL } from "./config";
import mongoose from "mongoose";

const app = express();
//===========================
app.get("/", (req, res) => {
  console.log(req);
  res.send("hello world");
});

//=============================

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("🌱 Connected to mongoDB");
    app.listen(PORT, () => console.log(`🦻 Listening on port: ${PORT}`));
  })
  .catch((err) => console.log(err));
