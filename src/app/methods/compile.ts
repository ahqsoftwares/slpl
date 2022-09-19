let jsCode: Array<string> = [];
/**
 * Compiles the code to javascript
 * @param {string} code 
 * @param {Function} error
 */
function Compile(code: string, error: Function) {
         const lines = code.split("\n");
         for (const fragment of lines) {
                  const commands = fragment.split(" ");
                  console.log(commands);
         }
}
module.exports = Compile