const jwt = require('jsonwebtoken');

let payload = {
    iss: " wendreo.design",
    iat: new Date().getSeconds(),
    exp: new Date().setMinutes(60),
    name: "Wendreo L. Fernandes",
    email: "wendreolf@gmail.com",
};

var token = jwt.sign(payload, "batman batman batman");

console.log('token', token);