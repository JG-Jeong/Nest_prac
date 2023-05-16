import * as express from "express";
import catsRouter from "./cats/cats.route";

import { error } from "console";

const app: express.Express = express();
const port: number = 8000;

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("this is logging middleware.");
  next();
});

//* json middleware
app.use(express.json());

app.use(catsRouter);

//* 404 middleware
app.use((req, res, next) => {
  res.send({ error: "404 not found" });
});

app.listen(port, () => {
  console.log(`Example app  http://localhost:${port}`);
});
