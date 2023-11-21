import { Strategy } from 'passport-local';
import AuthService from '../services/AuthService.js';

const authService = new AuthService();

export const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await authService.findUser(email);
      if (!user) {
        return done(null, false, { message: 'Wrong email or password' });
      }
      if (user.status === 'blocked') {
        return done(null, false, {
          message:
            'Your account has been blocked. Please contact to administrator if you think this is an error',
        });
      }
      const passwordIsValid = await authService.validPasswords(email, password);
      if (!passwordIsValid) {
        return done(null, false, { message: 'Wrong email or password' });
      }
      return done(null, user, { message: 'Logged in Successfully' });
    } catch (err) {
      return done(err);
    }
  }
);
