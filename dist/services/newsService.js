"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsRepository_1 = require("../repositories/newsRepository");
class NewsService {
    get() {
        return newsRepository_1.default.find({});
    }
    getById(_id) {
        return newsRepository_1.default.findById(_id);
    }
    create(news) {
        return newsRepository_1.default.create(news);
    }
    update(_id, news) {
        return newsRepository_1.default.findByIdAndUpdate(_id, news);
    }
    delete(_id) {
        return newsRepository_1.default.findByIdAndRemove(_id);
    }
}
exports.default = new NewsService();
