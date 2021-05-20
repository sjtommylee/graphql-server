import { request } from "graphql-request";
import { User } from "../entity/User";
import { createTypeOrmConnection } from "../utils/createTypeOrmConnection";

beforeAll(async () => {
  await createTypeOrmConnection();
});

const host = "http://localhost:4000";
const email = "tesdt@gmail.com";
const password = "dlfjdkf";
const mutation = `

mutation {
    register(email: "${email}", password: "${password}")
}

`;
test("Register User", async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  // const users = await User.find({ where: { email } });
  // expect(users).toHaveLength(1);
  // const user = users[0];
  // expect(user.email).toEqual(email);
  // expect(user.password).not.toEqual(password);
});

// use a test db
// drop all db once test is over
// yarn est when server is over;
