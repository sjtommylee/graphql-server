import { request } from "graphql-request";
import { User } from "../../entity/User";
// import { createTypeOrmConnection } from "../utils/createTypeOrmConnection";
import { startServer } from "../../startServer";
import { AddressInfo } from "net";
import { duplicateEmail } from "./errorMessages";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port } = app.address() as AddressInfo;
  getHost = () => `http://127.0.0.1:${port}`;
});

// const host = "http://localhost:4000";
const email = "tommy@gmail.com";
const password = "Dltmdwns";
const mutation = (email: string, password: string) => `
mutation {
    register(email: "${email}", password: "${password}") {
      path
      message
    }
}
`;
test("Register User", async () => {
  const response = await request(getHost(), mutation(email, password));
  expect(response).toEqual({ register: null });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);

  //test for duplicate email
  const response2: any = await request(getHost(), mutation(email, password));
  expect(response2.register).toHaveLength(1);
  expect(response2.register[0]).toEqual({
    path: "email",
    message: duplicateEmail,
  });
  //catch email

  const response3: any = await request(getHost(), mutation("b", password));
  expect(response3.register).toHaveLength(1);
  expect(response3.register[0].path).toEqual("email");
});
