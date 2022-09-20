module.exports = function checkFiles(dir: string, run?: Boolean) {
         const chalk = require("chalk");
         const path = require("path");
         const { readFileSync, statSync, readdirSync, mkdirSync, writeFile, rmdirSync, emptyDirSync, copySync } = require("fs-extra");
         function getFiles(dirPath: string, arrayOfFiles?: Array<string>): Array<string> {
                  let files: Array<string> = readdirSync(dirPath);
                
                  arrayOfFiles = arrayOfFiles || []
                
                  for (const file of files) {
                           if (statSync(dirPath + "/" + file).isDirectory() && file !== "out") {
                                    arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles)
                           } else if (file !== "out") {
                                    arrayOfFiles.push(path.join(dirPath, "/", file))
                           }
                  }
                
                  return arrayOfFiles
         }

         function getFileNames(locations: Array<string>, dir: string): Array<string> {
                  let files: Array<string> = [];

                  for (const file of locations) {
                           files.push(file.replace(dir, ""));
                  }

                  return files;
         }
         const paths = getFiles(dir);

         const files = getFileNames(paths, path.join(dir, "/"));

         
         try {
                  mkdirSync(path.join(dir, "/", "out", "/"));
         } catch (e) {
                  emptyDirSync(path.join(dir, "/", "out", "/"));
                  rmdirSync(path.join(dir, "/", "out", "/"));
                  mkdirSync(path.join(dir, "/", "out", "/"));
         }

         const slplCompiler = new (require("../app/compiler"))(path.join(dir, "/", "out", "/"), (error: string) => {
                  console.log(chalk`{red ${error}}`);
                  return;
         });
         if (files.some((name) => name === "package.slpl")) {
                  console.log(chalk`{green Found package.slpl}\n{yellow Will compile package data}`);
         }
         if (files.some((name) => name.endsWith(".splf"))) {
                  console.log(chalk`{green Found Functions}\n{yellow Will compile functions}`);
         }
         if (!files.some((name) => name === "index.spli")) {
                  return console.log(chalk`{red Could not find {yellow index.spli}}`);
         }

         for (const path of paths) {
                  let data = String(readFileSync(path));

                  console.log(chalk.yellow(`\n\nCompiling ${path.replace((require("path")).join(dir, "/"), "")}`));
                  if (path.endsWith("index.spli")) {
                           const compiled = slplCompiler.compileIndex(data);

                           writeFile((require("path")).join(dir, "/", "out", "/", "index.js"), compiled, () => {

                           });
                  } else if (path.endsWith(".splf")) {
                           const compiled = slplCompiler.compileFn(data);
                           const file = getFileNames([path], (require("path")).join(dir, "/"))[0];
                           let formats = file.split(".");
                           formats.splice(formats.length - 1, 1);

                           writeFile((require("path")).join(dir, "/", "out", "/", `${formats.join(".")}.js`), compiled, () => {

                           });
                  } else if (path.endsWith(".slpl")) {
                           slplCompiler.compilePackage(data);
                  } else {
                           copySync(path, (require("path")).join(dir, "/", "out", "/", path.replace((require("path")).join(dir, "/"), "")));
                  }
                  console.log(chalk.green(`Compiled ${path.replace((require("path")).join(dir, "/"), "")}`));

         }
}