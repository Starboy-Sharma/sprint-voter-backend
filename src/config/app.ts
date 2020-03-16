type AppConfig = {
  /**
   * This value determines the "environment" that the application is currently
   * running in. This may determine how to configure various services that the
   * application utilizes. Set this in the ".env" file.
   *
   * @default "production"
   */
  env: string;

  /**
   * This value determines if the application is in debug mode. It is a shorthand
   * which is based on the "environment", see {@link AppConfig.env}.
   */
  debug: boolean;

  /**
   * This value determines the port on which the application will listen.
   *
   * @default 8000
   */
  port: number;
};

const appConfig: Readonly<AppConfig> = {
  env: process.env.NODE_ENV || "production",
  get debug() {
    return this.env !== "production";
  },
  port: Number(process.env.PORT) || 8000
};

export default appConfig;
