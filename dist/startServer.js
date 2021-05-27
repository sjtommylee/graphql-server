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
exports.startServer = void 0;
require("reflect-metadata");
require("dotenv/config");
const createTypeOrmConnection_1 = require("./utils/createTypeOrmConnection");
const express_session_1 = __importDefault(require("express-session"));
const graphql_yoga_1 = require("graphql-yoga");
const genSchema_1 = require("./utils/genSchema");
const redis_1 = require("./redis");
const confirmEmail_1 = require("./routes/confirmEmail");
const connect_redis_1 = __importDefault(require("connect-redis"));
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("./constants");
const createTestConnection_1 = require("./utils/tests/createTestConnection");
const RedisStore = connect_redis_1.default(express_session_1.default);
const SESSION_SECRET = "nabys";
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === "test") {
        yield redis_1.redis.flushall();
    }
    const server = new graphql_yoga_1.GraphQLServer({
        schema: genSchema_1.genSchema(),
        context: ({ request }) => ({
            redis: redis_1.redis,
            url: request.protocol + "://" + request.get("host"),
            session: request.session,
            req: request,
        }),
    });
    server.express.use(express_session_1.default({
        store: new RedisStore({
            client: redis_1.redis,
            prefix: constants_1.redisPrefix,
        }),
        name: "qid",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    }));
    const cors = {
        credentials: true,
        origin: process.env.FRONTEND_HOST,
    };
    server.express.get("/confirm/:id", confirmEmail_1.confirmEmail);
    if (process.env.NODE_ENV === "test") {
        yield createTestConnection_1.createTestConnection(true);
    }
    else {
        yield createTypeOrmConnection_1.createTypeOrmConnection();
    }
    const app = yield server.start({
        cors,
        port: process.env.NODE_ENV === "test" ? 0 : 4000,
    });
    console.log(chalk_1.default.black.bgGreen("server is running on localhost: 4000"));
    return app;
});
exports.startServer = startServer;
//# sourceMappingURL=startServer.js.map