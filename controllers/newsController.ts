import NewsService from "../services/newsService";
import * as HttpStatus from "http-status";
import * as redis from "redis";

import Helper from "../infra/helper";
import ExportFiles from "../infra/exportFiles";

class NewsController {
  async get(req, res) {
    try {
      let client = redis.createClient();

      await client.get("news1", async function(err, reply) {
        if (reply) {
          console.log("redis");
          Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
        } else {
          let result = await NewsService.get();
          client.set("news1", JSON.stringify(result));
          client.expire("news1", 20);
          Helper.sendResponse(res, HttpStatus.OK, result);
        }
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  async getById(req, res) {
    try {
      const _id = req.params.id;
      let result = await NewsService.getById(_id);
      Helper.sendResponse(res, HttpStatus.OK, result);
    } catch (error) {
      console.error("error:", error);
    }
  }

  async search(req, res) {
    try {
      const term = req.params.term;

      const page = req.param("page") ? parseInt(req.param("page")) : 1;
      const perPage = req.param("limit") ? parseInt(req.param("limit")) : 10;

      let result = await NewsService.search(term, page, perPage);
      Helper.sendResponse(res, HttpStatus.OK, result);
    } catch (error) {
      console.error("error:", error);
    }
  }

  async exportToCsv(req, res) {
    try {
      let response = await NewsService.get();
      let filename = ExportFiles.tocsv(response);

      Helper.sendResponse(
        res,
        HttpStatus.OK,
        req.get("host") + "/exports/" + filename
      );
    } catch (error) {
      console.error("error:", error);
    }
  }

  async create(req, res) {
    try {
      let vm = req.body;
      await NewsService.create(vm);
      Helper.sendResponse(res, HttpStatus.OK, `Notícia criada com sucesso!`);
    } catch (error) {
      console.error("error", error);
    }
  }

  async update(req, res) {
    try {
      const _id = req.params.id;
      let news = req.body;

      await NewsService.update(_id, news);

      Helper.sendResponse(
        res,
        HttpStatus.OK,
        `News foi atualizada com sucesso!`
      );
    } catch (error) {
      console.error("error", error);
    }
  }

  async delete(req, res) {
    try {
      const _id = req.params.id;

      await NewsService.delete(_id);

      Helper.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!");
    } catch (error) {
      console.error("error", error);
    }
  }
}

export default new NewsController();
