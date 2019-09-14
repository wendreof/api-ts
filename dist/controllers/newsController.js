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
const exportFiles_1 = require("../infra/exportFiles");
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
                            client.set("news1", JSON.stringify(result));
                            client.expire("news1", 20);
                            helper_1.default.sendResponse(res, HttpStatus.OK, result);
                        }
                    });
                });
            }
            catch (error) {
                console.error("error", error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                let result = yield newsService_1.default.getById(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, result);
            }
            catch (error) {
                console.error("error:", error);
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const term = req.params.term;
                const page = req.param("page") ? parseInt(req.param("page")) : 1;
                const perPage = req.param("limit") ? parseInt(req.param("limit")) : 10;
                let result = yield newsService_1.default.search(term, page, perPage);
                helper_1.default.sendResponse(res, HttpStatus.OK, result);
            }
            catch (error) {
                console.error("error:", error);
            }
        });
    }
    exportToCsv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield newsService_1.default.get();
                let filename = exportFiles_1.default.tocsv(response);
                helper_1.default.sendResponse(res, HttpStatus.OK, req.get("host") + "/exports/" + filename);
            }
            catch (error) {
                console.error("error:", error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vm = req.body;
                yield newsService_1.default.create(vm);
                helper_1.default.sendResponse(res, HttpStatus.OK, `Notícia criada com sucesso!`);
            }
            catch (error) {
                console.error("error", error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                let news = req.body;
                yield newsService_1.default.update(_id, news);
                helper_1.default.sendResponse(res, HttpStatus.OK, `News foi atualizada com sucesso!`);
            }
            catch (error) {
                console.error("error", error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                yield newsService_1.default.delete(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!");
            }
            catch (error) {
                console.error("error", error);
            }
        });
    }
}
exports.default = new NewsController();
