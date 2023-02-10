const sessionOptions = {
  password: process.env.IRON_PASSWORD as string,
  cookieName: 'session_cookie',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export default sessionOptions;
