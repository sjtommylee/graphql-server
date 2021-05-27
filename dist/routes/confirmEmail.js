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
exports.confirmEmail = void 0;
const User_1 = require("../entity/User");
const redis_1 = require("../redis");
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = yield redis_1.redis.get(id);
    if (userId) {
        yield User_1.User.update({ id: userId }, { confirmed: true });
        yield redis_1.redis.del(id);
        res.send("ok");
    }
    else {
        res.send("invalid");
    }
});
exports.confirmEmail = confirmEmail;
//# sourceMappingURL=confirmEmail.js.map