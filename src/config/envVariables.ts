const validate = (name: string, envVariable?: string): string => {
  if (!envVariable) {
    throw new Error(`The Environment Variable ${name} is missing`);
  }

  return envVariable;
};

const envVariables = {
  env: process.env.NODE_ENV,
  auth: {
    ironPassword: validate('IRON_PASSWORD', process.env.IRON_PASSWORD),
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
    },
    tokenSecret: validate('TOKEN_SECRET', process.env.NEXT_PUBLIC_TOKEN_SECRET),
  },
  mongodb: {
    uri:
      process.env.NODE_ENV === 'production'
        ? validate('MONGODB_URI_PROD', process.env.MONGODB_URI_PROD)
        : validate('MONGODB_URI', process.env.MONGODB_URI),
    dbName: validate('DBNAME', process.env.DBNAME),
  },
  jwt: {
    secret: validate('JWT_SECRET', process.env.JWT_SECRET),
    resetPasswordExpirationMinutes: validate(
      'JWT_RESET_PASSWORD_EXPIRATION_MINUTES',
      process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES
    ),
    verifyEmailExpirationMinutes: validate(
      'JWT_VERIFY_EMAIL_EXPIRATION_MINUTES',
      process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    ),
  },
  email: {
    smtp: {
      host: validate('SMTP_HOST', process.env.SMTP_HOST),
      port: Number(validate('SMTP_PORT', process.env.SMTP_PORT)),
      auth: {
        user: validate('SMTP_USERNAME', process.env.SMTP_USERNAME),
        pass: validate('SMTP_PASSWORD', process.env.SMTP_PASSWORD),
      },
    },
    from: validate('EMAIL_FROM', process.env.EMAIL_FROM),
  },
  siteUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://mckenzie-store.netlify.app'
      : 'http://localhost:3001',
};

export default envVariables;
