"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYupError = void 0;
const formatYupError = (error) => {
    const errors = [];
    error.inner.forEach((e) => {
        errors.push({
            path: e.path,
            message: e.message,
        });
    });
    return errors;
};
exports.formatYupError = formatYupError;
//# sourceMappingURL=formatYupError.js.map