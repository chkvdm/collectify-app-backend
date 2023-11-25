import CommentsService from '../services/CommentsService.js';
import CollectionsController from './CollectionsController.js'; // удалить

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
      const newComment = await commentsService.addComment(
        itemId,
        fromUser,
        text
      );
      const comments = await commentsService.findCommentsWithName(itemId);
      const formattedComments = await commentsService.playItems(comments);
      const io = req.app.get('socketio');
      io.emit('comment', { comments: formattedComments });

      const client = req.app.get('client');
      await client.index({
        index: 'search-comments',
        id: newComment.id,
        body: {
          id: newComment.id,
          user: fromUser,
          item: newComment.itemId,
          text: newComment.text,
        },
      });
      return res.status(201).json({ comments: formattedComments });
    } catch (err) {
      next(err);
    }
  }
}
