import CommentsService from '../services/CommentsService.js';
import CollectionsController from './CollectionsController.js';

const commentsService = new CommentsService();

export default class AuthController {
  async getAllComments(req, res, next) {
    try {
      const { itemId } = req.params;
      const comments = await commentsService.findCommentsWithName(itemId);
      const formattedComments = await commentsService.playItems(comments);
      return res.status(200).json({ comments: formattedComments });
    } catch (err) {
      next(err);
    }
  }

  async createComment(req, res, next) {
    try {
      const { itemId, fromUser, text } = req.body;
      await commentsService.addComment(itemId, fromUser, text);
      const comments = await commentsService.findCommentsWithName(itemId);
      const formattedComments = await commentsService.playItems(comments);
      const io = req.app.get('socketio');
      io.emit('comment', { comments: formattedComments });
      return res.status(201).json({ comments: formattedComments });
    } catch (err) {
      next(err);
    }
  }
}
