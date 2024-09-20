require("dotenv").config();

export const PORT = process.env.PORT || 5555;
export const MONGO_DB_URL = process.env.MONGO_DB_URL;
if (!MONGO_DB_URL) {
  throw new Error("MONGO_DB_URL is not defined in environment variables.");
}
