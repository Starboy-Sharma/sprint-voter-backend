type DatabaseConfig = {
  /**
   * Get the full connection string
   */
  connectionString: string;

  /**
   * Hostname of the MongoDB instance.
   *
   * @default "localhost"
   */
  hostname: string;

  /**
   * Port of the MongoDB instance.
   *
   * @default "27017"
   */
  port: string;

  /**
   * Name of the database that this app can use.
   */
  name: string | undefined;

  /**
   * The username of your MongoDB user. May not be required during development
   * if your local MongoDB instance does not have access control enabled.
   */
  username: string | undefined;

  /**
   * The password for your MongoDB user. May not be required during development
   * if your local MongoDB instance does not have access control enabled.
   */
  password: string | undefined;
};

const databaseConfig: Readonly<DatabaseConfig> = {
  get connectionString(): string {
    const auth = this.username ? `${this.username}:${this.password}@` : "";
    return `mongodb://${auth}${this.hostname}:${this.port}/${this.name}`;
  },

  hostname: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "27017",
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

export default databaseConfig;
