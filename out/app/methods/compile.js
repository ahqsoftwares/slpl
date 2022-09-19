"use strict";
let jsCode = [];
/**
 * Compiles the code to javascript
 * @param {string} code
 * @param {Function} error
 */
function Compile(code, error) {
    const lines = code.split("\n");
    for (const fragment of lines) {
        const commands = fragment.split(" ");
        console.log(commands);
    }
}
module.exports = Compile;
