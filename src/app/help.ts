module.exports = function Help() {
         const chalk = require("chalk");

         console.log(chalk`{green Help Menu!}

Following are the Simple Programming Language commands:
- {green compile}
         Description: {yellow Compiles your code to plain javascript}
         Usage: {red slpl compile}

- {green run}
         Description: {yellow Compiles and runs your code}
         Usage: {red slpl run}`);
}