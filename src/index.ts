import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

const app = express();
dotenv.config();

app.use(
  cors({
    credentials: true
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(234).send("Hello World!");
});

app.get("/users", (req: express.Request, res: express.Response) => {
  res.status(234).send("There are list of users");
});

const server = http.createServer(app);
const port = process.env.PORT;
const url = process.env.MONGO_URL;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

mongoose.Promise = Promise;
mongoose
  .connect(url)
  .then(() => {
    console.log("App is connected to database");
  })
  .catch(error => {
    console.log(error);
  });
