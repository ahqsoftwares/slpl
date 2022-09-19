process.argv.splice(0, 2);
const args = require("./modules/parse")(process.argv);

(async() => {
         console.log(args);
})()