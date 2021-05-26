const chalk = require("chalk");

export const logger = (...params: any[]) => {
  params.forEach((p) => {
    console.log(chalk.bold.magenta(p));
  });
};
