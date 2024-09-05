import dotenv from "dotenv";
import { NodeEnvironment } from "../utils/types";
import { Sequelize } from "sequelize-typescript";
import { setting } from "../config/db";



dotenv.config();

const env = (process.env.NODE_ENV as NodeEnvironment) || "development";
const config = setting[env];

/**
 * Models would be loaded manually. This is because of the modelMatch option in the sequelize constructor
 * @see [Sequelize-Typescript](https://www.npmjs.com/package/sequelize-typescript#model-path-resolving)
 */

const connString = `${config.dialect}://${config.username}:${config.password}@${config.host}/${config.database}`;

const sequelize = new Sequelize(connString, {
  models: [

  ],
});

export default sequelize;
