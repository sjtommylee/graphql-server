import { getConnectionOptions, createConnection } from "typeorm";

// creating a async function called createTestConn, which is going to take in a boolean value with its intial value set at false.
export const createTestConnection = async (resetDB: boolean = false) => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({
    ...connectionOptions,
    name: "default",
    synchronize: resetDB,
    dropSchema: resetDB,
  });
};
