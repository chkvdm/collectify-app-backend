import { Comments } from '../models/comments.model.js';
import { Users } from '../models/users.model.js';

export default class CollectionService {
  async findComments(itemId) {
    return await Comments.findAll({ where: { itemId } });
  }

  async addComment(itemId, fromUser, text) {
    return await Comments.create({ itemId, fromUser, text });
  }

  async findCommentsWithName(itemId) {
    return await Comments.findAll({
      where: { itemId },
      order: [['createdAt', 'DESC']],
      include: { model: Users, attributes: ['name'] },
    });
  }

  async formatCreatedAt(date) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: userTimeZone,
    };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  async playItems(comments) {
    const plainComments = comments.map((el) => el.get());
    const formattedComments = await Promise.all(
      plainComments.map(async (comment) => ({
        ...comment,
        createdAt: await this.formatCreatedAt(comment.createdAt),
      }))
    );
    return formattedComments;
  }
}
