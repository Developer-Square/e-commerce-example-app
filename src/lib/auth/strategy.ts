import Local from 'passport-local';

import { UserService } from '../users/users.services';

const verify: Local.VerifyFunction = (
  username: string,
  password: string,
  done: (error: any, user?: any, options?: Local.IVerifyOptions) => void
) => {
  const Users = new UserService();
  Users.findByName(username)
    .then(async (user) => {
      if (user && (await Users.verifyPassword(user.name, password))) {
        done(null, user);
      } else {
        done(new Error('Invalid name, email or password'));
      }
    })
    .catch((error) => {
      done(error);
    });
};

const LocalStrategy = new Local.Strategy(verify);

export default LocalStrategy;
