/*
|--------------------------------------------------------------------------
| Load environment variables
|--------------------------------------------------------------------------
*/
import dotenv from "dotenv";
const { error } = dotenv.config();
if (error) {
  // We can't use our logger here, because it depends on the config, which
  // isn't available until the environment variables are loaded.
  console.error("Failed to load environment variables:\n", error);
  process.exit(1);
}

/*
|--------------------------------------------------------------------------
| Import config modules
|--------------------------------------------------------------------------
|
| This is done *after* calling dotenv.config() to ensure all environment
| variables are loaded.
|
*/

import appConfig from "./app";
import databaseConfig from "./database";

/*
|--------------------------------------------------------------------------
| Export config modules
|--------------------------------------------------------------------------
*/
export default {
  app: appConfig,
  database: databaseConfig
};
