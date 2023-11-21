import express from 'express';
import passport from 'passport';
import CommentsController from '../controllers/CommentsController.js';

const router = express.Router();
const commentsController = new CommentsController();

router.get('/all-comments/:itemId', commentsController.getAllComments);

router.post(
  '/comment',
  passport.authenticate('jwt', { session: false }),
  commentsController.createComment
);

export default router;
