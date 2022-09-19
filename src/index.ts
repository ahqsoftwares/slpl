process.argv.splice(0, 2);
const args = require("./modules/parse")(process.argv);
const chalk = require("chalk");
const compiler = require("./app/compiler");

(async() => {
         console.log(args);
         const slpl = new compiler();

         switch (args["_bin"][0]) {
                  case "compile":
                           break;
                  case "run":
                           break;
                  default:
                           require("./app/help")()
                           break;
         }
})()