const { exec } = require("child_process");

const version = require("./package.json").version;
const chalk = require("chalk");

function publish(tag) {
         console.log(`Publishing @${chalk.green(tag ? tag : "latest")}`);
         exec(`npm publish${tag ? ` --tag=${tag}` : ""}`, {env: process.env}, (err, stderr, out) => {
                  if (err) {
                           console.log(chalk.red(String(err)));
                  }
                  if (stderr) {
                           console.log(chalk.red(String(stderr)));
                  }
                  console.log(chalk.green(String(out)));
         });
}

if (version.endsWith("-dev")) {
         publish("dev");
} else if (version.endsWith("-beta")) {
         publish("beta");
} else if (version.endsWith("-rc")) {
         publish("rc");
} else {
         publish();
}
