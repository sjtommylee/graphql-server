import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
import Redis from "ioredis";
import { User } from "./entity/User";

const chalk = require("chalk");

export const startServer = async () => {
  const redis = new Redis();
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
    }),
  });
  // console.log(chalk.red.bold(server));

  server.express.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    const userId: string | any = await redis.get(id);
    if (userId) {
      await User.update({ id: userId }, { confirmed: true });
      await redis.del(id);
      res.send("ok");
    } else {
      res.send("invalid");
    }
  });

  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.bold.green("server is running on localhost: 4000"));
  return app;
};
