import * as express from "express";
import Database from "./infra/db";
import * as cors from "cors";
import * as compression from "compression";

import * as bodyParser from "body-parser";
import Auth from "./infra/auth";
import Uploads from "./infra/uploads";
import newsRouter from "./router/newsRouter";

class StartUp {
  public app: express.Application;
  private _db: Database;
  private bodyParser;

  constructor() {
    this.app = express();

    this._db = new Database();
    this._db.createConnection();

    this.middler();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET, OPTIONS, PUT, POST, DELETE",
      origin: "*"
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send({ version: "0.0.1" });
    });

    this.app.route("/uploads").post(Uploads.single("file"), (req, res) => {
      try {
        res.send("file sent with sucess!");
      } catch (error) {
        console.log("error", error);
      }
    });

    // this.app.use(Auth.validate);

    //new
    this.app.use("/", newsRouter);
  }
}

export default new StartUp();
