"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk = require("chalk");
const logger = (...params) => {
    params.forEach((p) => {
        console.log(chalk.bold.magenta(p));
    });
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map