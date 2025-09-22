"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, db_1.connectToDatabase)();
const __dirname = path_1.default.resolve();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
if (process.env.NODE_ENV !== "production") {
    app.use((0, cors_1.default)());
}
(0, index_route_1.default)(app);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../client/dist/index.html"));
    });
}
app.listen(port, () => {
    console.log("Server is running on Port: " + port);
});
