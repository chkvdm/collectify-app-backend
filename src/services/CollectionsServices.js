import { Collections } from '../models/collections.model.js';
import { OptionalFieldType } from '../models/optionalFieldType.js';
import { Items } from '../models/items.model.js';
import { OptionalFieldValue } from '../models/optionalFieldValue.js';
import { Likes } from '../models/likes.model.js';
import { Comments } from '../models/comments.model.js';
import { Themes } from '../models/themes.model.js';
import { Types } from '../models/types.model.js';
import { Sequelize } from 'sequelize';

import sequelize from '../config/database.js';

export default class CollectionService {
  async allThemes() {
    return await Themes.findAll();
  }

  async allTypes() {
    return await Types.findAll();
  }

  async addCollection(userId, name, theme, description, image) {
    return await Collections.create({
      userId: userId,
      collectionName: name,
      description: description,
      theme: theme,
      image: image,
    });
  }

  async addOptionalField(collectionId, OptionalField) {
    for (const element of OptionalField) {
      await OptionalFieldType.create({
        collectionId: collectionId,
        fieldName: element.name,
        fieldType: element.type,
      });
    }
  }

  async findColections(userId) {
    return await Collections.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findColection(collectionId) {
    return await Collections.findOne({ where: { id: collectionId } });
  }

  async findOptFieldsTypes(collectionId) {
    return await OptionalFieldType.findAll({ where: { collectionId } });
  }

  async findAllItems(collectionId) {
    return await Items.findAll({
      where: { collectionId },
      order: [['createdAt', 'DESC']],
      include: {
        model: OptionalFieldValue,
        attributes: ['fieldName', 'value'],
      },
    });
  }

  async findTags() {
    return await Items.findAll({
      attributes: ['tags'],
      order: [['createdAt', 'DESC']],
      limit: 10000,
    });
  }

  async findLargest() {
    const query = `
    SELECT \`collection_id\`, COUNT(*) AS count
    FROM \`items\`
    GROUP BY \`collection_id\`
    ORDER BY count DESC
    LIMIT 5;
  `;
    return await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
  }

  async addItem(itemProp) {
    return await Items.create({
      collectionId: itemProp.collectionId,
      itemName: itemProp.itemName,
      tags: itemProp.tags,
    });
  }

  async addOptField(itemId, optField, optFieldValue) {
    return await OptionalFieldValue.create({
      itemId: itemId,
      fieldName: optField,
      value: optFieldValue,
    });
  }

  async updateItem(itemProp) {
    return await Items.update(
      { itemName: itemProp.itemName, tags: itemProp.tags },
      {
        where: {
          id: itemProp.id,
        },
      }
    );
  }

  async updateOptField(itemId, optField, optFieldValue) {
    return await OptionalFieldValue.update(
      { fieldName: optField, value: optFieldValue },
      {
        where: {
          itemId: itemId,
          fieldName: optField,
        },
      }
    );
  }

  async removeItem(id) {
    await Items.destroy({
      where: {
        id,
      },
    });
  }

  async findItem(id) {
    return await Items.findOne({
      where: { id },
      include: [
        {
          model: OptionalFieldValue,
          attributes: ['fieldName', 'value'],
        },
        {
          model: Likes,
          attributes: ['fromUser'],
        },
        {
          model: Collections,
          attributes: ['collectionName'],
        },
      ],
    });
  }

  async findLastItems() {
    return await Items.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comments,
          attributes: ['fromUser'],
        },
        {
          model: Likes,
          attributes: ['fromUser'],
        },
        {
          model: Collections,
          attributes: ['collectionName'],
        },
      ],
    });
  }

  async newLike(userId, itemId) {
    return await Likes.create({ toItem: itemId, fromUser: userId });
  }

  async deleteLike(userId, itemId) {
    await Likes.destroy({
      where: {
        toItem: itemId,
        fromUser: userId,
      },
    });
  }

  async removeCollection(id) {
    await Collections.destroy({
      where: {
        id,
      },
    });
  }
}
