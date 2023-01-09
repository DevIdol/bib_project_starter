import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { logger } from "./logger/Logger";
import connectDB from "./db";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));
app.use(express.static(path.join(__dirname, "../client/public")));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//db
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    message: "Project Starter is OK",
  });
});

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
