# NodeJS API starter

## Testing

This project uses two different types of tests: **unit tests** that test a specific component in isolation, and **feature tests** that test a complete feature from the API call to the database (also called integration tests or end to end tests). As a general rule, start by writing a feature test, and jump down to the unit level if a particular unit is complicated enough.

This project uses [Jest](https://jestjs.io) as its test runner.

### Running tests

- `yarn test` to run all tests.
- `yarn test:feature` to run only feature tests.
- `yarn test:unit` to run only unit tests.
- `yarn test:watch` to run all tests in watch mode. (Very useful during development.)


### Filenaming

- **Unit tests**  
Unit test files should have the same name as the file of the code that they are testing, suffixed by `.spec`. Unit test files are placed next to the code that they are testing, either in a `.spec.ts` file right next to the code, or in a `__tests__` folder. This ensures relative imports appear shorter. Colocation also helps find tests more quickly.

- **Feature tests**  
Feature test files should have a descriptive name based on the feature that they are testing, suffixed by `.test`. Feature tests files are placed in the `tests/` folder. For example: `login.test.ts`.


### Feature tests

Feature tests test the application in its entirety. A feature test sends a request to the appliation and examines its output, as well as any side effects. For example, a feature test might send a POST request to create some resource, validate the response, and check if the database contains the newly created resource. Inversely, a feature test might add some data to the database, send a GET request and validate the the response contains the expected data.

The project uses [SuperTest](https://github.com/visionmedia/supertest) to test an HTTP requests. Simply import the express app from `src/app`, and pass it to SuperTest to make a request.

```ts
import request from "supertest";
import app from "../src/app";

test("example", async () => {
  const response = await request(app).get("your/route");
})
```

#### Test database

Since feature tests can hit the database, and we don't want our tests to run on our regular database this project uses [jest-mongodb](https://github.com/shelfio/jest-mongodb) to setup an in-memory version of MongoDB. When setting up for a feature test, we have to tell Mongoose to connect to this database instead. To simplify this process, the project has an `tests/util/useTestDatabase.ts` utility. To connect to the test database from a feature test simply import this utility and call it.

```ts
import useTestDatabase from "./util/useTestDatabase";

useTestDatabase();
```

This utility connects mongoose to the in-memory MongoDB before all tests, cleans up the connection after all tests, resets all collections between tests (to ensure each test starts with a clean database state).
