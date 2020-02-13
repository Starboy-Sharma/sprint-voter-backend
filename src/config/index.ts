/*
|--------------------------------------------------------------------------
| Load environment variables
|--------------------------------------------------------------------------
*/
import dotenv from "dotenv";
dotenv.config(); // TODO: handle dotenv error

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
