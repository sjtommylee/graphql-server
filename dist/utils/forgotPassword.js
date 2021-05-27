"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const uuid_1 = require("uuid");
const forgotPassword = (url, userId, redis) => __awaiter(void 0, void 0, void 0, function* () {
    const id = uuid_1.v4();
    yield redis.set(`forgot password: ${id}`, userId, "ex", 60 * 60 * 24);
    return `${url}/change-password/${id}`;
});
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map