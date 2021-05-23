import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import path from "path";
import { genSchema } from "../utils/genSchema";

export const typescriptTypes = generateNamespace("GQL", genSchema());
fs.writeFile(
  path.join(__dirname, "../types/schema.d.ts"),
  typescriptTypes,
  (err) => {
    console.log(err);
  }
);