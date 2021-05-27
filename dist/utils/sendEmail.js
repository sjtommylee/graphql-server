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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const sparkpost_1 = __importDefault(require("sparkpost"));
const API_KEY = "ab4e5102d9bacf92c4d1e5d5602b018d780cb465";
const client = new sparkpost_1.default(API_KEY);
const sendEmail = (recipient, url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.transmissions.send({
        options: {
            sandbox: true,
        },
        content: {
            from: "testing@sparkpostbox.com",
            subject: "Confirm Email",
            html: `<html>
        <body>
        <p>Testing SparkPost - the world's most awesomest email service!</p>
        <a href="${url}">confirm email</a>
        </body>
        </html>`,
        },
        recipients: [{ address: recipient }],
    });
    console.log(response);
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map