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
const newsRepository_1 = require("../repositories/newsRepository");
class NewsService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield newsRepository_1.default.find({});
            return result;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield newsRepository_1.default.findById(_id);
            return result;
        });
    }
    create(news) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield newsRepository_1.default.create(news);
            return result;
        });
    }
    update(_id, news) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield newsRepository_1.default.findByIdAndUpdate(_id, news);
            return result;
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield newsRepository_1.default.findByIdAndRemove(_id);
            return result;
        });
    }
}
exports.default = new NewsService();
