import NewsService from "../services/newsService";
import * as HttpStatus from "http-status";
import * as redis from "redis";

import Helper from "../infra/helper";

class NewsController {
  get(req, res) {
    let client = redis.createClient();

    client.get("news1", function(err, reply) {
      if (reply) {
        console.log("redis");
        Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
      } else {
        NewsService.get()
          .then(news => {
            console.log("db");
            client.set("news1", JSON.stringify(news));
            client.expire("news1", 2);
            Helper.sendResponse(res, HttpStatus.OK, news);
          })
          .catch(error => console.error.bind(console, `Error ${error}`));
      }
    });
  }

  getById(req, res) {
    const _id = req.params.id;

    NewsService.getById(_id)
      .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch(error => console.error.bind(console, `Error ${error}`));
  }

  create(req, res) {
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

  update(req, res) {
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

  delete(req, res) {
    const _id = req.params.id;

    NewsService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!")
      )
      .catch(error => console.error.bind(console, `Error ${error}`));
  }
}

export default new NewsController();
