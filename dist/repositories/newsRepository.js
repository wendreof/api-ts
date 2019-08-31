"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const newsSchema_1 = require("../models/newsSchema");
exports.default = mongoose.model('news', newsSchema_1.default);
