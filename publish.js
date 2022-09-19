const { exec } = require("child_process");

const version = require("./package.json").version;
const chalk = require("chalk");

function publish(tag) {
         console.log(`Publishing @${chalk.green(tag ? tag : "latest")}`);
         exec(`npm publish${tag ? `--tag=${tag}` : ""}`, {env: process.env}, (err, stderr, out) => {
                  if (err) {
                           throw new Error(String(err));
                  }
                  if (stderr) {
                           console.log(chalk.red(String(stderr)));
                           return
                  }
                  console.log(chalk.green(String(out)));
         });
}

if (version.endsWith("-dev")) {
         publish("dev");
} else if (version.endsWith("-beta")) {
         publish("beta");
} else {
         publish();
}