"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const redis = require("redis");
const helper_1 = require("../infra/helper");
class NewsController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let client = redis.createClient();
                yield client.get("news1", function (err, reply) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (reply) {
                            console.log("redis");
                            helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                        }
                        else {
                            let result = yield newsService_1.default.get();
                            client.set("news1", JSON.stringify(res));
                            client.expire("news1", 20);
                            helper_1.default.sendResponse(res, HttpStatus.OK, res);
                        }
                    });
                });
            }
            catch (error) {
                console.error();
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            newsService_1.default.getById(_id)
                .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
                .catch(error => console.error.bind(console, `Error ${error}`));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let vm = req.body;
            newsService_1.default.create(vm)
                .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, "Noticia cadastrada com sucesso!"))
                .catch(error => console.error.bind(console, `Error ${error}`));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            let news = req.body;
            newsService_1.default.update(_id, news)
                .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, ` News foi atualizada com sucesso!`))
                .catch(error => console.error.bind(console, `Error ${error}`));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            newsService_1.default.delete(_id)
                .then(() => helper_1.default.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!"))
                .catch(error => console.error.bind(console, `Error ${error}`));
        });
    }
}
exports.default = new NewsController();
