import { request } from "graphql-request";
import { invalidLogin } from "./errorMessages";

const loginMutation = (email: string, password: string) => `
mutation {
    register(email: "${email}", password: "${password}") {
      path
      message
    }
}
`;
const TEST_HOST = "http://localhost.4000";
describe("login", () => {
  test("test login", async () => {
    const response = await request(
      TEST_HOST as string,
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
