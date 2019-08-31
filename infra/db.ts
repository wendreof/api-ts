import * as mongoose from "mongoose";
import { createConnection } from "net";

class Db {
  private DB_URL = 'mongodb://link-db/db_portal';

  createConnection() {
    mongoose.connect(this.DB_URL);
  }
}

export default Db;
