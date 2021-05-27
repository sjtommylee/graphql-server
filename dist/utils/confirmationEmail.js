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
const uuid_1 = require("uuid");
const confirmationEmail = (url, userId, redis) => __awaiter(void 0, void 0, void 0, function* () {
    const id = uuid_1.v4();
    console.log("confirmationemail.ts", id);
    yield redis.set(id, userId, "ex", 60 * 60 * 24);
    return `${url}/confirm/${id}`;
});
exports.default = confirmationEmail;
//# sourceMappingURL=confirmationEmail.js.map