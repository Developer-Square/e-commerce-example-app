const envVariables = {
  env: process.env.NODE_ENV,
  auth: {
    tokenSecret: process.env.TOKEN_SECRET,
  },
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.DBNAME,
  },
};

export default envVariables;
