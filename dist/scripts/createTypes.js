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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescriptTypes = void 0;
const from_schema_1 = require("@gql2ts/from-schema");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const genSchema_1 = require("../utils/genSchema");
const constants_1 = require("../constants");
exports.typescriptTypes = from_schema_1.generateNamespace(constants_1.nameSpacePrefix, genSchema_1.genSchema());
fs.writeFile(path_1.default.join(__dirname, "../types/schema.d.ts"), exports.typescriptTypes, (err) => {
    console.log(err);
});
//# sourceMappingURL=createTypes.js.map