import Local from 'passport-local';

import Users from '@/lib/users/users.services';

const localStrategy = new Local.Strategy((username, password, done) => {
  Users.findByName(username)
    .then((user) => {
      if (user && user.password === Users.hashPassword(password, user.salt)) {
        done(null, user);
      } else {
        done(new Error('Invalid username and password combination'));
      }
    })
    .catch((error) => {
      done(error);
    });
});

export default localStrategy;
