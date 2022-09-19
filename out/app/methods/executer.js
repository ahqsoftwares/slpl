"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
module.exports = function Executer(path) {
    const app = (0, child_process_1.spawn)("node", [path]);
    app.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    app.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    app.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
};
