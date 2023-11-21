import express from 'express';
import passport from 'passport';
import UsersController from '../controllers/UsersController.js';

const router = express.Router();
const usersController = new UsersController();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  usersController.getUsers
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  usersController.updateUser
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  usersController.deleteUser
);

export default router;
