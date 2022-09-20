const { spawn } = require("child_process");

module.exports = function Executer(path: string) {
         const app = spawn("node", [path]);

         app.stdout.on('data', (data: string) => {
                  console.log(`stdout: ${data}`);
         });
                
         app.stderr.on('data', (data: string) => {
                  console.error(`stderr: ${data}`);
         });
                
         app.on('close', (code: Number) => {
                  console.log(`child process exited with code ${code}`);
         });
}