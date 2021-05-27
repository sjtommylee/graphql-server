"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.resolvers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../../entity/User");
const yup = __importStar(require("yup"));
const uuid_1 = require("uuid");
const formatYupError_1 = require("../../../utils/formatYupError");
const errorMessages_1 = require("../errorMessages");
const confirmationEmail_1 = __importDefault(require("../../../utils/confirmationEmail"));
const sendEmail_1 = require("../../../utils/sendEmail");
const schema = yup.object().shape({
    email: yup.string().min(3, errorMessages_1.invalidEmailLength).max(255).email(errorMessages_1.invalidEmail),
    password: yup.string().min(3, errorMessages_1.invalidPasswordLength).max(255),
});
exports.resolvers = {
    Mutation: {
        register: (_, args, { redis, url }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield schema.validate(args, { abortEarly: false });
                debugger;
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const { email, password } = args;
            const userAlreadyExists = yield User_1.User.findOne({
                where: { email },
                select: ["id"],
            });
            if (userAlreadyExists) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.duplicateEmail,
                    },
                ];
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = User_1.User.create({
                id: uuid_1.v4(),
                email,
                password: hashedPassword,
            });
            user.save();
            sendEmail_1.sendEmail(email, yield confirmationEmail_1.default(url, user.id, redis));
            return null;
        }),
    },
};
//# sourceMappingURL=resolver.js.map