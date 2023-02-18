const ironPassword = process.env.NEXT_PUBLIC_IRON_PASSWORD;

if (!ironPassword) throw new Error(' Iron Session Password is missing');

const sessionOptions = {
  password: ironPassword,
  cookieName: 'session_cookie',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export default sessionOptions;
