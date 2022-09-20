"use strict";
module.exports = function checkFiles(dir) {
    const chalk = require("chalk");
    const path = require("path");
    const { readFileSync, statSync, readdirSync, mkdirSync, writeFile, writeFileSync } = require("fs");
    function getFiles(dirPath, arrayOfFiles) {
        let files = readdirSync(dirPath);
        arrayOfFiles = arrayOfFiles || [];
        for (const file of files) {
            if (statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles);
            }
            else {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
        return arrayOfFiles;
    }
    function getFileNames(locations, dir) {
        let files = [];
        for (const file of locations) {
            files.push(file.replace(dir, ""));
        }
        return files;
    }
    const paths = getFiles(dir);
    const files = getFileNames(paths, path.join(dir, "/"));
    try {
        mkdirSync(path.join(dir, "/", "out", "/"));
    }
    catch (e) {
    }
    const slplCompiler = new (require("../app/compiler"))(path.join(dir, "/", "out", "/"), (error) => {
        console.log(chalk `{red ${error}}`);
        return;
    });
    if (files.some((name) => name === "package.slpl")) {
        console.log(chalk `{green Found package.slpl}\n{yellow Will compile package data}`);
    }
    if (files.some((name) => name.endsWith(".splf"))) {
        console.log(chalk `{green Found Functions}\n{yellow Will compile functions}`);
    }
    if (!files.some((name) => name === "index.spli")) {
        return console.log(chalk `{red Could not find {yellow index.spli}}`);
    }
    for (const path of paths) {
        let data = String(readFileSync(path));
        if (path.endsWith("index.spli")) {
            const compiled = slplCompiler.compileIndex(data);
            writeFile((require("path")).join(dir, "/", "out", "/", "index.js"), compiled, () => {
            });
        }
        else if (path.endsWith(".splf")) {
            slplCompiler.compileFn(data);
        }
        else if (path.endsWith(".slpl")) {
            slplCompiler.compilePackage(data);
        }
        else {
            slplCompiler.addAssets(path);
        }
    }
};
