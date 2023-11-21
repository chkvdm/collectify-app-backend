import config from '../../config.js';
import { Strategy, ExtractJwt } from 'passport-jwt';

export const jwtStrategy = new Strategy(
  {
    secretOrKey: config.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token.id);
    } catch (err) {
      done(err);
    }
  }
);
