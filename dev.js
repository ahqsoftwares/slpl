const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const { execSync } = require("child_process");

let cache = [];
let config = {};

console.log(chalk.yellow("Watching file for changes..."));

function watch() {
         for (const data of cache) {
                  const buffer = fs.readFileSync(data);

                  if (String(buffer).length !== config[data]) {
                           reCompile();
                  }

                  config[data] = String(buffer).length;
         }
}

function reCompile() {
         try {
                  console.log(chalk.yellow("ReCompiling due to changes!"));
                  execSync("yarn build");
                  console.log(chalk.green("ReCompiled Successfully!"));
         } catch (e) {
                  console.log(chalk.red("Could not compile due to errors!"));
         }
}

setInterval(() => {
         function getFiles(dirPath, arrayOfFiles) {
                  files = fs.readdirSync(dirPath);
                
                  arrayOfFiles = arrayOfFiles || []
                
                  files.forEach(function(file) {
                           if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                                    arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles)
                           } else {
                                    arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
                           }
                  })
                
                  return arrayOfFiles
         }

         cache = getFiles("./src", []);
         watch();
}, 2000);