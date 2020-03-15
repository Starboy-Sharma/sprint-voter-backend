# NodeJS API starter

### Contents

- [Running the project](#running-the-project)
- [Configuration](#configuration)
- [Development manual](#development-manual)
  - [Development setup](#development-setup)
  - [Project structure](#project-structure)
  - [Configuration](#configuration-1)
  - [Testing](#testing)

## Running the project

1. Make sure you have the required software installed. (See [required software](#required-software).)
1. Clone the repository.
1. Install dependencies (run `yarn`).
1. Configure the project through environment variables (also possible through an `.env` file). (See [configuration](#configuration).)
1. Build the project (run `yarn run build`).
1. Start the server (run `yarn run start`).

#### Required software

* [NodeJS](https://nodejs.org/en/) version `^13.1.0`
* [Yarn](https://yarnpkg.com) version `^1.21.1`
* [MongoDB](https://www.mongodb.com) (tested using version `v4.2.2`)

## Configuration

| Variable | Type | Default | Explanation |
| -------- | ---- | ------- | ----------- |
| `PORT` | `number` | `8000` | Determines the port on which the application will listen. |
| `DB_HOST` | `string` | `"localhost"` | Hostname of the MongoDB instance. |
| `DB_PORT` | `string` | `"27017"` | Port of the MongoDB instance. |
| `DB_NAME` | `string?` | — | Optional. Name of the database that this app can use. Will use the [default database](https://kb.objectrocket.com/mongo-db/how-to-change-the-mongo-default-database-from-test-204) of the MongoDB instance if omitted. |
| `DB_USERNAME` | `string?` | — | Optional. The username of your MongoDB user. May not be required during development if your local MongoDB instance does not have access control enabled. |
| `DB_PASSWORD` | `string?` | — | Optional. The password for your MongoDB user. May not be required during development if your local MongoDB instance does not have access control enabled. |

# Development Manual

## Development setup

1. Make sure you have the required software installed. (See [required software](#required-software).)
1. Clone the repository.
1. Install dependencies (run `yarn`).
1. Configure the project.
    1. Create a `.env` file by copying the `example.env` file. (Run `cp example.env .env`.)
    1. Configure your settings. (See [configuration](#configuration).)


### Useful commands for development

* `yarn run dev` runs the project using [nodemon](https://nodemon.io) so it is restarted when the code changes.
* `yarn run test:watch` runs the test suite in interactive mode, rerunning the tests when the code changes.
* `yarn run lint:fix` lints the code, automatically fixing issues where possible.
* `yarn run build` builds the project.

## Project structure

The general structure and architecture of this project are based on the article titled ["Bulletproof node.js project architecture"](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme#service). In short, the architecture consists of 3 main layers: routing, services, and data access. Additionally, the [publisher/subscriber pattern](https://medium.com/@pongpiraupra/decoupling-modules-using-publisher-subscriber-in-node-js-7dd22206ad13) is used to decouple side effects from service layer. The following diagram summarizes these components:

![architecture](https://user-images.githubusercontent.com/15139826/76702892-b63cfb00-66cd-11ea-9fee-b8fcd3d563c9.png)

In the case of this project:

* The routing layer refers to the express routing logic. See [route controllers](#route-controllers).
* The service layer consists of service classes. See [services](#services).
* The data access layer refers to Mongoose models.
* The event listeners layer refers to the listener classes. See [listeners](#listeners).

Aside from these major architectural components the project contains several other types of components.

* Config. Configuration of the application is done through several typescript files. See [configuration](#configuration-1).
* Loaders. The startup sequence of the application is split into several smaller modules.
* Tests. See [testing](#testing).

Consider the folder structure of the project, it separates all of these components.

```
.
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── api/ (routing)
│   │   ├── middleware/
│   │   └── routes/
│   ├── config/
│   ├── listeners/
│   ├── loaders/
│   ├── models/
│   └── services/
└── tests
    ├── *.test.ts
    └── util/
```

### Route controllers

The first layer, the routing layer, is responsible for everything related to HTTP requests and responses. A route controller knows about the `request` and `response` object, request parameters, the request body, HTTP status codes, etc. Important to note is that route controllers do NOT contain business logic, nor do they have any notion of a database etc. This is to ensure a good separation of concerns. Instead, route controllers call to a [service](#services) class to handle business logic.

In express it is possible to separate routing logic into multiple modular [routers](http://expressjs.com/en/5x/api.html#router). This concept is used to split the applications routing logic up into smaller modules. Consider the following code snippet, which contains a sample route controller using `express.Router`. This router can be imported and attached to the main express app.

```ts
import { Router } from "express";
const router = Router();

// Attach route handlers and other middleware
router.get("/subroute", async (req, res) => {});

export default router;
```

### Services

The second layer, the service layer, is responsible for handling business logic and interacting with the data access layer. A service class knows about Mongoose models. Additionally, it may fire/emit events that can be handled by event listeners. Important to note is that a service class should not know anything about HTTP, as this is the job of the [routing layer](#route-controllers).

The service layer consists of service classes, each responsible for an isolated piece of business logic. The following code snippet contains a very basic service class for managing `Example` models.

```ts
import ExampleModel, { Example } from "../models/example";

class ExampleService {
  async findAll(): Promise<Example[]> {
    return ExampleModel.find();
  }
}

export default new ExampleService();
```

### Listeners

> TODO

## Configuration

Configuration for this project is done through typescript files stored under `src/config`. This ensures all code referencing configuration items is still type safe. Configuration is broken up into multiple smaller config files each containing only related configuration items. For example the `config/database.ts` file contains all configuration for the MongoDB connection. 

While some configuration items can be hard coded into these typescript files, most config items depend on the environment in which the app is running. Therefore, these config items should be read from environment variables. Note that some env related config items can have sensible defaults. Consider the following example:

```ts
const databaseConfig {
  hostname: process.env.DB_HOST || "localhost",
}
```

To make declaring environment variables a little bit easier during development, this project supports declaring environment variables through an `.env` file. The `.env` file should be located in the root of the repository.

### Adding a new config file

While the configuration is split up into multiple files, we want the config to appear as a single object in the rest of the code. For this reason the individual config files are re-exported from the `config/index.ts` file. **When adding a new config file, remember to re-export it as well**.

```ts
import databaseConfig from "./database";

// re-export
export default {
  database: databaseConfig
}
```

## Testing

This project uses two different types of tests: **unit tests** that test a specific component in isolation, and **feature tests** that test a complete feature from the API call to the database (also called integration tests or end to end tests). As a general rule, start by writing a feature test, and jump down to the unit level if a particular unit is complicated enough.

This project uses [Jest](https://jestjs.io) as its test runner.

### Running tests

- `yarn test` to run all tests.
- `yarn test:feature` to run only feature tests.
- `yarn test:unit` to run only unit tests.
- `yarn test:watch` to run all tests in watch mode. (Very useful during development.)


### File naming

- **Unit tests**  
Unit test files should have the same name as the file of the code that they are testing, suffixed by `.spec`. Unit test files are placed next to the code that they are testing, either in a `.spec.ts` file right next to the code, or in a `__tests__` folder. This ensures relative imports appear shorter. Colocation also helps find tests more quickly. <br> For example: `src/models/item.spec.ts`.

- **Feature tests**  
Feature test files should have a descriptive name based on the feature that they are testing, suffixed by `.test`. Feature tests files are placed in the `tests/` folder. <br> For example: `tests/login.test.ts`.

### Mocking Mongoose in unit tests

This project uses [`mockingoose`](https://www.npmjs.com/package/mockingoose) to mock Mongoose models in unit tests. Consider the example below. The code snippet contains code to test an example `ItemSerivce` with a `findAll()` method. As you can see we can simply instruct `mockingoose` to mock `ItemModel` and make it return our set of sample data from the `ItemModel.find()` method. Note that we reset our mocks before each test.

```ts
import mockingoose from "mockingoose";

import ItemModel from "../models/item";
import itemService from "./item";

beforeEach(() => {
  mockingoose.resetAll();
});

test("example", async () => {
  const data = [{ name: "First item" }];
  mockingoose(ItemModel).toReturn(data, "find");
  const result = await itemService.findAll();
  expect(result).toMatchObject(data);
})
```

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
