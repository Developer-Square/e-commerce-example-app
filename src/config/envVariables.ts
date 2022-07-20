const validate = (name: string, envVariable?: string): string => {
  if (!envVariable)
    throw new Error(`The Environment Variable ${name} is missing`);
  return envVariable;
};

const envVariables = {
  env: process.env.NODE_ENV,
  auth: {
    password: validate('IRON_PASSWORD', process.env.IRON_PASSWORD),
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
    },
  },
  mongodb: {
    uri: validate('MONGODB_URI', process.env.MONGODB_URI),
    dbName: validate('DBNAME', process.env.DBNAME),
  },
};

export default envVariables;
