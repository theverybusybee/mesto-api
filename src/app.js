"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
var app = (0, express_1.default)();
app.listen(PORT, function () {
    console.log("App is listening on port ".concat(PORT));
});
