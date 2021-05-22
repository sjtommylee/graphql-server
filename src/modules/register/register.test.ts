import { request } from "graphql-request";
import { User } from "../../entity/User";
// import { createTypeOrmConnection } from "../utils/createTypeOrmConnection";
import { startServer } from "../../startServer";
import { AddressInfo } from "net";
let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port } = app.address() as AddressInfo;
  getHost = () => `http://127.0.0.1:${port}`;
});

// const host = "http://localhost:4000";
const email = "tes";
const password = "1";
const mutation = `

mutation {
    register(email: "${email}", password: "${password}") {
      path
      message
    }
}
`;
test("Register User", async () => {
  const response = await request(getHost(), mutation);
  expect(response).toEqual({ register: null });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);

  const response2: any = await request(getHost(), mutation);
  expect(response2.register).toHaveLength(1);
  expect(response2.register[0].path).toEqual("email");

  expect(response2).toEqual({
    register: [
      {
        path: "email",
        message: "already taken",
      },
    ],
  });
});
