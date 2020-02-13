export default {
  /**
   * This value determines the "environment" that the application is currently
   * running in. This may determine how to configure various services that the
   * application utilizes. Set this in the ".env" file.
   *
   * @type {string}
   * @default "production"
   */
  env: process.env.NODE_ENV || "production",

  /**
   * This value determines the port on which the application will listen.
   *
   * @type {number}
   * @default 8000
   */
  port: parseInt(process.env.PORT) || 8000
};
