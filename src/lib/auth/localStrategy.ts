/* eslint-disable no-underscore-dangle */
import Local from 'passport-local';

import Users from '@/lib/users/users.services';

import type { IUserWithoutPassword } from '../users/users.types';

const localStrategy = new Local.Strategy((username, password, done) => {
  Users.findByName(username)
    .then((user) => {
      if (user && user.password === Users.hashPassword(password, user.salt)) {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const userWithoutPassword: IUserWithoutPassword = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          _createdAt: user._createdAt,
          _updatedAt: user._updatedAt,
        };

        done(null, userWithoutPassword);
      } else {
        done(new Error('Invalid username and password combination'));
      }
    })
    .catch((error) => {
      done(error);
    });
});

export default localStrategy;
