"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var database_1 = require("./database");
(0, database_1.startConnection)();
app_1.default.listen(3000);
console.log('Server is running on port', 3000);
