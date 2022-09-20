"use strict";
const { spawn } = require("child_process");
module.exports = function Executer(path) {
    const app = spawn("node", [path]);
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
