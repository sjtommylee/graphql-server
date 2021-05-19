// import { startServer } from "..";
import { request } from "graphql-request";
import { User } from "../entity/User";
import { createConnection } from "typeorm";
const host = "http://localhost:4000";
const email = "test@gmail.com";
const password = "dlfjdkf";
const mutation = `

mutation {
    register(email: "${email}", password: "${password}")
}

`;
test("Register User", async () => {
  //   await startServer();
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  await createConnection();
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).toEqual(password);
});
