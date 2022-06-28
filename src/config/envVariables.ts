import * as env from 'env-var';

const envVariables = {
  env: process.env.NODE_ENV,
  auth: {
    cookieName: env
      .get('COOKIE_NAME')
      .default('e-commerce-app_session-cookies')
      .asString(),
    password: env.get('PASSWORD').required().asString(),
    tokenSecret: env.get('TOKEN_SECRET').required().asString(),
  },
  mongodb: {
    uri: env
      .get('MONGODB_URI')
      .default('mongodb://127.0.0.1:27017')
      .required()
      .asString(),
    dbName: env
      .get('DBNAME')
      .default('e-commerce-example-app')
      .required()
      .asString(),
  },
};

export default envVariables;
