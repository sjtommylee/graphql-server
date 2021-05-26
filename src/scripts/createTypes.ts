import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import path from "path";
import { genSchema } from "../utils/genSchema";
import { nameSpacePrefix } from "../constants";
//script to generate types from the schemas.
// passing in a namespace prefix (GQL) with the generated schema.
export const typescriptTypes = generateNamespace(nameSpacePrefix, genSchema());
fs.writeFile(
  path.join(__dirname, "../types/schema.d.ts"),
  typescriptTypes,
  (err) => {
    console.log(err);
  }
);
