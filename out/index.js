"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
process.argv.splice(0, 2);
const args = require("./modules/parse")(process.argv);
const chalk = require("chalk");
const compiler = require("./app/compiler");
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(args);
    const slpl = new compiler();
    switch (args["_bin"][0]) {
        case "compile":
            break;
        case "run":
            break;
        default:
            require("./app/help")();
            break;
    }
}))();
