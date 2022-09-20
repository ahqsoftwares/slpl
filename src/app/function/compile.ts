/**
 * Compiles the code to javascript
 * @param {string} code 
 * @param {Function} error
 */
 function FunctionCompile(code: string, error: Function) {
         const types: any = require("./types");
         let jsCode = "";

         const lines = code.split("\n");
         for (const fragment of lines) {
                  const commands = fragment.split(" ");
                  let codeFrag = "";

                  switch (commands[0]) {
                           case "USES:SLPL:CORE":
                                    codeFrag = `const fs = require("fs");\nconst process = require("process");\n`;
                                    break;
                           case "MODULE":
                                    const [mod, AWAIT, extra] = commands;

                                    codeFrag = `\nmodule.exports = `;

                                    if (AWAIT === "AWAIT") {
                                             codeFrag += `async function ${extra}{`;
                                    } else {
                                             codeFrag += `function ${AWAIT}{`;
                                    }

                                    break;
                           
                           case "SEND":
                                    const sender = commands[1] || 0;
                                    codeFrag += `return ${sender};\n`;
                                    break;
                           case "LOAD":
                                    const moduler = commands[1].replaceAll("\r", "");
                                    codeFrag += `const ${moduler} = require("./${moduler}.js");\n`;
                                    break;
                           case "$$":
                                    const [$$, name, equals, type, ...others] = commands;
                                    drop($$, equals);
                                    let data: any;

                                    if (!types[type]) {
                                             error(`Illegal Type: ${type}\nAvailable: ${Object.keys(types).join(", ")}`)
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
                                    } else {
                                             data = others[0].replaceAll("\r", "");
                                    }

                                    const result = eval(types[type].replaceAll("{data}", type === "STRING" ? data.replaceAll("\\\"", "\\\"") : data));

                                    codeFrag = `const ${name} = ${JSON.stringify(result)};\n`;
                                    break;
                           case "$":
                                    const [$, nma, eq, typed, ...other] = commands;
                                    dropValues($, eq);
                                    let variables: any;

                                    if (!types[typed]) {
                                             error(`Illegal Type: ${typed}\nAvailable: ${Object.keys(types).join(", ")}`)
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
                                    } else {
                                             variables = other[0].replaceAll("\r", "");
                                    }

                                    const res = eval(types[typed].replaceAll("{data}", typed === "STRING" ? variables.replaceAll("\\\"", "\\\"") : variables));

                                    codeFrag = `let ${nma} = ${JSON.stringify(res)};\n`;
                                    break;
                           case "\r":
                                    codeFrag = "\n";
                                    break;
                           case "":
                                    break;
                           case "END-MODULE":
                                    codeFrag = "}";
                                    break;
                           default:
                                    error(`Illegal operator: ${commands[0]}`);
                                    throw new Error("Illegal Operator")
                  }

                  jsCode += codeFrag;
         }
         return jsCode;
}

/**
 * Drops the values
 * @param {Array<string>} values 
 */
function dropValues(...values: Array<string>) {
         values;
}
module.exports = FunctionCompile