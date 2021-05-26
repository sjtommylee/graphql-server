import { createConnection, getConnectionOptions } from "typeorm";

/**
 * @function createTypeOrmConnection - asynchronous function that will wait for the connection options we get. "test" vs "start"?
 *
 */
export const createTypeOrmConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
};
