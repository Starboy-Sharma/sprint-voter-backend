export default {
  /**
   * Hostname of the MongoDB instance.
   *
   * @type {string}
   * @default "localhost"
   */
  hostname: process.env.DB_HOST || "localhost",

  /**
   * Port of the MongoDB instance.
   *
   * @type {string}
   * @default "27017"
   */
  port: process.env.DB_PORT || "27017",

  /**
   * Name of the database that this app can use.
   *
   * @type {string}
   */
  name: process.env.DB_NAME,

  /**
   * The username of your MongoDB user. May not be required during development
   * if your local MongoDB instance does not have access control enabled.
   *
   * @type {string|undefined}
   */
  username: process.env.DB_USERNAME,

  /**
   * The password for your MongoDB user. May not be required during development
   * if your local MongoDB instance does not have access control enabled.
   *
   * @type {string|undefined}
   */
  password: process.env.DB_PASSWORD
};
