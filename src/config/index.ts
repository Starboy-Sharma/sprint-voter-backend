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

/*
|--------------------------------------------------------------------------
| Export config modules
|--------------------------------------------------------------------------
*/
export default {
  app: appConfig
};
