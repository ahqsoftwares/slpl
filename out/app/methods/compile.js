"use strict";
/**
 * Compiles the code to javascript
 * @param {string} code
 * @param {Function} error
 */
function Compile(code, error) {
    const types = require("./types");
    let jsCode = "";
    const lines = code.split("\n");
    for (const fragment of lines) {
        const commands = fragment.split(" ");
        let codeFrag = "";
        switch (commands[0]) {
            case "LOAD":
                const moduler = commands[1].split(";")[0];
                codeFrag += `const ${moduler} = require("./${moduler}.js");\n`;
                break;
            case "$$":
                const [$$, name, equals, type, ...others] = commands;
                let data;
                if (!types[type]) {
                    error(`Illegal Type: ${type}\nAvailable: ${Object.keys(types).join(",")}`);
                }
                if (type === "STRING" || type === "JSON") {
                    let raw = [];
                    for (const key of others) {
                        /*if (key.endsWith(";\r")) {
                                 let parts = key.split(";");
                                 parts.splice(parts.length - 1, 1);
                                 raw.push(parts.join(";"));
                        } else {*/
                        raw.push(key.replaceAll("\r", ""));
                        /*}*/
                    }
                    data = raw.join(" ");
                }
                else {
                    data = others[0].split(";")[0];
                }
                const result = eval(types[type].replaceAll("{data}", data));
                codeFrag = `const ${name} = ${JSON.stringify(result)};\n`;
                break;
            case "$":
                break;
            case "":
                break;
            default:
                error(`Illegal operator: ${commands[0]}`);
                throw new Error("Illegal Operator");
        }
        jsCode += codeFrag;
    }
    return jsCode;
}
module.exports = Compile;
