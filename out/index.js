"use strict";
process.argv.splice(0, 2);
const args = require("./modules/parse")(process.argv);
const chalk = require("chalk");
const compiler = require("./app/compiler");
(async () => {
    switch (args["_bin"][0]) {
        case "compile":
            require("./modules/checks")(process.cwd());
            break;
        case "run":
            break;
        default:
            require("./app/help")();
            break;
    }
})();
