import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5555;
export const MONGO_DB_URL = process.env.MONGO_DB_URL;