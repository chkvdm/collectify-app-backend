import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import AuthController from '../controllers/AuthController.js';
import { validateForm, showInvalidData } from '../validator/formValidator.js';
import config from '../../config.js';

const router = express.Router();
const authController = new AuthController();

router.post(
  '/register',
  validateForm,
  showInvalidData,
  authController.registersUser
);

router.post('/login', validateForm, showInvalidData, async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json(info);
      }
      const token = jwt.sign(
        { id: user.id, role: user.role },
        config.secretKey
      );
      return res.status(200).json({ info: info, token: token });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

router.get('/status/:userId', authController.getUserStatus);

export default router;
