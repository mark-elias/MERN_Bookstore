import { Schema, model } from "mongoose";

// for TypeScript, create INTERFACE
// for TYPES
export interface IBook {
  title: string;
  author: string;
  publishYear: number;
}

// make SCHEMA, basically like an INTERFACE
// this is needed for Mongoose
const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishYear: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

// make Model (basically a Class)
// specify TYPE/INTERFACE
// add SCHEMA to model()
// write the name of the Collection "books"
export const BookModel = model<IBook>("book", BookSchema);
