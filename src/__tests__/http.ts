import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "utils/http";

// setup the mock sever
const apiUrl = process.env.REACT_APP_API_URL;
const server = setupServer();

// beforeAll is from Jest, execute before every test
beforeAll(() => server.listen());

// reset the mock server after every test
afterEach(() => server.resetHandlers());

// close the mock server after the test
afterAll(() => server.close());

test("http method send async request", async () => {
  const endpoint = "testendpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`http://localhost:3001/test`, (req, res, ctx) => {
      res(ctx.json(mockResult));
    })
  );

  const result = await http("test");
  expect(result).toEqual(mockResult);
});
