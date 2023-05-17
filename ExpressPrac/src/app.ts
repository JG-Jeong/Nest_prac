import * as express from "express";
import catsRouter from "./cats/cats.route";

const port: number = 8000;

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  // Route에 관련된 Middleware 작업
  private setRoute() {
    this.app.use(catsRouter);
  }

  // 미들웨어 작업
  private setMiddleware() {
    //* logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log("this is logging middleware.");
      next();
    });

    //* json middleware
    this.app.use(express.json());

    this.setRoute();

    //* 404 middleware
    this.app.use((req, res, next) => {
      res.send({ error: "404 not found" });
    });
  }

  // public
  public listen() {
    //각각의 미들웨어를 불러와야 함
    this.setMiddleware();
    this.app.listen(port, () => {
      console.log(`Example app  http://localhost:${port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
