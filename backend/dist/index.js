"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const booksRoute_1 = __importDefault(require("./routes/booksRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/books", booksRoute_1.default);
app.get("/", (req, res) => {
    res.send("hello world");
});
if (!config_1.MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not defined in the environment variables.");
}
mongoose_1.default
    .connect(config_1.MONGO_DB_URL)
    .then(() => {
    console.log("🌱 Connected to mongoDB");
    app.listen(config_1.PORT, () => console.log(`🦻 Listening on port: ${config_1.PORT}`));
})
    .catch((err) => console.log(err));
