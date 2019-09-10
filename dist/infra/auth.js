"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const configs_1 = require("./configs");
class Auth {
    validate(req, res, next) {
        var token = req.headers["x-access-token"];
        if (token) {
            jwt.verify(token, configs_1.default.secret, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: "403 - Invalid token"
                    });
                }
                else {
                    next();
                }
            });
        }
        else {
            return res.status(401).send({
                success: false,
                message: "401 -unauthorized"
            });
        }
    }
}
exports.default = new Auth();
