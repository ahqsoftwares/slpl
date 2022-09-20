"use strict";
const compile = require("./compiler/compile");
const compileFn = require("./function/compile");
const path = require("path");
let error = (msg) => {
};
/**
 * The Simple Level Programming Language Code Structurer
 */
module.exports = class SlPl {
    /**
     * Creates the structurer
     * @param {string} main
     * @param {object} functions
     * @param {Function} callback
     */
    constructor(out, callback) {
        error = callback;
        this.out = out;
    }
    /**
     * Compiles code to javascript
     * @param {string} data code for the main file
     */
    compileIndex(data) {
        return compile(data, error);
    }
    /**
     * Compiles a function to plain javascript
     * @param {string} fn code for function
     */
    compileFn(fn) {
        return compileFn(fn, error);
    }
    /**
     * Compiles package.slpl to package.json
     * @param {string} packageFile packge.slpl code
     */
    compilePackage(packageFile) {
    }
    /**
     * Add an asset to the out dir
     * @param path
     */
    addAssets(path) {
    }
};
