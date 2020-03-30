const OLD_ENV = process.env;

const testEnv = {
  DB_HOST: "localhost",
  DB_PORT: "27017",
  DB_NAME: "example",
  DB_USERNAME: "example-user",
  DB_PASSWORD: "password123"
};

beforeEach(() => {
  jest.resetModules();
  process.env = { ...testEnv };
});

afterAll(() => {
  process.env = OLD_ENV;
});

describe("connectionString", () => {
  it("returns a full connection string", async () => {
    const databaseConfig = (await import("./database")).default;
    const result = databaseConfig.connectionString;
    expect(result).toBe(
      `mongodb://${testEnv.DB_USERNAME}:${testEnv.DB_PASSWORD}@${testEnv.DB_HOST}:${testEnv.DB_PORT}/${testEnv.DB_NAME}`
    );
  });
  describe("when DB_USERNAME is not set", () => {
    it("returns a connection string without authentication section", async () => {
      process.env.DB_USERNAME = undefined;
      process.env.DB_PASSWORD = undefined;
      const databaseConfig = (await import("./database")).default;
      const result = databaseConfig.connectionString;
      expect(result).toBe(
        `mongodb://${testEnv.DB_HOST}:${testEnv.DB_PORT}/${testEnv.DB_NAME}`
      );
    });
  });
});

describe("shortConnectionString", () => {
  it("returns a short version connection string", async () => {
    const databaseConfig = (await import("./database")).default;
    const result = databaseConfig.shortConnectionString;
    expect(result).toBe(
      `${testEnv.DB_HOST}:${testEnv.DB_PORT}/${testEnv.DB_NAME}`
    );
  });
});
