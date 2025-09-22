import express, { Request, Response } from "express";
import routes from "./routes/index.route";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db";
import cors from "cors";
import path from "path";

dotenv.config();
connectToDatabase();

const port: string | number = process.env.PORT || 3000;
const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

routes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is running on Port: " + port);
});
