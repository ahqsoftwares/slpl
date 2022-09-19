"use strict";
const compile = require("./methods/compile");
let error = (msg) => {
};
/**
 * The Simple Level Programming Language Code Structurer
 */
class SlPl {
    /**
     * Creates the structurer
     * @param {string} main
     * @param {object} functions
     * @param {Function} callback
     */
    constructor(main, functions, callback) {
        error = callback;
        this.mainCode = main;
        this.sub = functions;
    }
    /**
     * Compiles code to javascript
     */
    compile() {
    }
}
module.exports = SlPl;
