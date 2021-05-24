import { request } from "graphql-request";
import { invalidLogin } from "./errorMessages";
import * as faker from "faker";

const loginMutation = (email: string, password: string) => `
mutation {
    register(email: "${email}", password: "${password}") {
      path
      message
    }
}
`;

describe("login", () => {
  test("test login", async () => {
    const response = await request(
      process.env.TEST_HOST as string,
      loginMutation("sj@sj.com", "dldl")
    );
    expect(response).toEqual({
      login: [
        {
          path: "email",
          message: invalidLogin,
        },
      ],
    });
  });
});
