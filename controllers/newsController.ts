import NewsService from "../services/newsService";
import * as HttpStatus from "http-status";
import * as redis from "redis";

import Helper from "../infra/helper";

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
          client.set("news1", JSON.stringify(res));
          client.expire("news1", 20);
          Helper.sendResponse(res, HttpStatus.OK, res);
        }
      });
    } catch (error) {
      console.error();
    }
  }

  async getById(req, res) {
    const _id = req.params.id;

    NewsService.getById(_id)
      .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async create(req, res) {
    let vm = req.body;

    NewsService.create(vm)
      .then(news =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Noticia cadastrada com sucesso!"
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async update(req, res) {
    const _id = req.params.id;
    let news = req.body;

    NewsService.update(_id, news)
      .then(news =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          ` News foi atualizada com sucesso!`
        )
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  async delete(req, res) {
    const _id = req.params.id;

    NewsService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!")
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }
}

export default new NewsController();
