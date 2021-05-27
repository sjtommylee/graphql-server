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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genSchema = void 0;
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const graphql_tools_1 = require("graphql-tools");
const glob = __importStar(require("glob"));
const genSchema = () => {
    const pathToModules = path.join(__dirname, "../modules");
    const graphqlTypes = glob
        .sync(`${pathToModules}/**/*.graphql`)
        .map((x) => fs.readFileSync(x, { encoding: "utf8" }));
    const resolvers = glob
        .sync(`${pathToModules}/**/resolvers.?s`)
        .map((resolver) => require(resolver).resolvers);
    return graphql_tools_1.makeExecutableSchema({
        typeDefs: merge_graphql_schemas_1.mergeTypes(graphqlTypes),
        resolvers: merge_graphql_schemas_1.mergeResolvers(resolvers),
    });
};
exports.genSchema = genSchema;
//# sourceMappingURL=genSchema.js.map