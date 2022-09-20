"use strict";
/**
 * Compiles the code to javascript
 * @param {string} code
 * @param {Function} error
 */
function Compile(code, error) {
    const types = require("./types");
    let core = false;
    let jsCode = "";
    const lines = code.split("\n");
    for (const fragment of lines) {
        const commands = fragment.split(" ");
        let codeFrag = "";
        switch (commands[0]) {
            case "USES":
                if (commands[1] === "CORE\r") {
                    console.log("Core enabled for index.spli!");
                    core = true;
                }
                break;
            case "CORE":
                if (!core) {
                    error("Core not enabled\nYou must enable core to use the low level js features!");
                    return;
                }
                else {
                    codeFrag = `${fragment.replaceAll("\r", "\n").replace("CORE", "")}\n`;
                }
                break;
            case "INSTALL":
                codeFrag = `const ${fragment.replaceAll("\r", "").replace("INSTALL", "")}`;
                break;
            case "LOAD":
                const moduler = commands[1].replaceAll("\r", "");
                codeFrag += `const ${moduler} = require("./${moduler}.js");\n`;
                break;
            case "$$":
                const [$$, name, equals, type, ...others] = commands;
                drop($$, equals);
                let data;
                if (!types[type]) {
                    error(`Illegal Type: ${type}\nAvailable: ${Object.keys(types).join(", ")}`);
                    return;
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
                    data = others[0].replaceAll("\r", "");
                }
                if (type !== "FUNCTION") {
                    const result = eval(types[type].replaceAll("{data}", type === "STRING" ? data.replaceAll("\\\"", "\\\"") : data));
                    codeFrag = `const ${name} = ${JSON.stringify(result)};\n`;
                }
                else {
                    codeFrag = `const ${name} = ${data};\n`;
                }
                break;
            case "$":
                const [$, nma, eq, typed, ...other] = commands;
                drop($, eq);
                let variables;
                if (!types[typed]) {
                    error(`Illegal Type: ${typed}\nAvailable: ${Object.keys(types).join(", ")}`);
                    return;
                }
                if (typed === "STRING" || typed === "JSON") {
                    let raw = [];
                    for (const key of other) {
                        /*if (key.endsWith(";\r")) {
                                 let parts = key.split(";");
                                 parts.splice(parts.length - 1, 1);
                                 raw.push(parts.join(";"));
                        } else {*/
                        raw.push(key.replaceAll("\r", ""));
                        /*}*/
                    }
                    variables = raw.join(" ");
                }
                else {
                    variables = other[0].replaceAll("\r", "");
                }
                if (typed !== "FUNCTION") {
                    const res = eval(types[typed].replaceAll("{data}", typed === "STRING" ? variables.replaceAll("\\\"", "\\\"") : variables));
                    codeFrag = `let ${nma} = ${JSON.stringify(res)};\n`;
                }
                else {
                    codeFrag = `let ${nma} = ${variables};\n`;
                }
                break;
            case "\r":
                codeFrag = "\n";
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
/**
 * Drops the values
 * @param {Array<string>} values
 */
function drop(...values) {
    values;
}
module.exports = Compile;
