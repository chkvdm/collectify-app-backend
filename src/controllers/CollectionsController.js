import _ from 'lodash';

import CollectionService from '../services/CollectionsServices.js';
const collectionService = new CollectionService();

export default class CollectionsController {
  constructor() {
    this.defaultImage =
      'https://res.cloudinary.com/daz6gyr7k/image/upload/v1698680634/collectify-collection-image/collection-default_fq8df2.webp';
  }

  async getThemes(req, res, next) {
    try {
      const themes = await collectionService.allThemes();
      return res.status(200).json({ themes });
    } catch (err) {
      next(err);
    }
  }

  async getTypes(req, res, next) {
    try {
      const types = await collectionService.allTypes();
      return res.status(200).json({ types });
    } catch (err) {
      next(err);
    }
  }

  createCollection = async (req, res, next) => {
    try {
      const { name, theme, description, optionalFields } = req.body;
      let image = this.defaultImage;
      if (req.file) {
        image = req.file.path;
      }
      const { userId } = req.params;
      const newCollection = await collectionService.addCollection(
        userId,
        name,
        theme,
        description,
        image
      );
      if (optionalFields) {
        await collectionService.addOptionalField(
          newCollection.id,
          optionalFields
        );
      }

      /////////// elastic start ////////////
      const client = req.app.get('client');

      await client.index({
        index: 'search-collections',
        id: newCollection.id,
        body: {
          id: newCollection.id,
          user: newCollection.userId,
          name: newCollection.collectionName,
          theme: newCollection.theme,
          description: newCollection.description,
        },
      });

      /////////// elastic end //////////////

      return res.status(201).end();
    } catch (err) {
      next(err);
    }
  };

  async getAllCollections(req, res, next) {
    try {
      const { userId } = req.params;
      const allCollections = await collectionService.findColections(userId);
      return res.status(200).json({ collections: allCollections });
    } catch (err) {
      next(err);
    }
  }

  async getCollection(req, res, next) {
    try {
      const collectionId = req.params.collectionId;
      const collection = await collectionService.findColection(collectionId);
      return res.status(200).json({ collection: collection });
    } catch (err) {
      next(err);
    }
  }

  async getLargestCollections(req, res, next) {
    try {
      const largestCollections = await collectionService.findLargest();
      return res.status(200).json({ largestCollections });
    } catch (err) {
      next(err);
    }
  }

  async getItemTableHeader(req, res, next) {
    try {
      const collectionId = req.params.collectionId;
      const optFieldsTypes = await collectionService.findOptFieldsTypes(
        collectionId
      );
      return res.status(200).json({ typesAndNames: optFieldsTypes });
    } catch (err) {
      next(err);
    }
  }

  async getItemTableData(req, res, next) {
    try {
      const collectionId = req.params.collectionId;
      const items = await collectionService.findAllItems(collectionId);
      return res.status(200).json({ items });
    } catch (err) {
      next(err);
    }
  }

  async createItem(req, res, next) {
    try {
      const { userId, item } = req.body;
      const collectionId = req.params.collectionId;
      const { id, itemName, tags, ...optField } = item;
      const itemProp = {
        collectionId,
        itemName,
        tags: tags.split(' '),
      };
      const newItem = await collectionService.addItem(itemProp);
      if (!_.isEmpty(optField)) {
        for (let [key, val] of Object.entries(optField)) {
          await collectionService.addOptField(newItem.id, key, val);
        }
      }

      /////////// elastic start ////////////

      const client = req.app.get('client');

      await client.index({
        index: 'search-items',
        id: newItem.id,
        body: {
          id: newItem.id,
          user: userId,
          collection: newItem.collectionId,
          name: newItem.itemName,
          tags: newItem.tags,
          optField: optField,
        },
      });

      /////////// elastic end ////////////

      return res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  async getAllTags(req, res, next) {
    try {
      const tags = await collectionService.findTags();
      return res.status(200).json({ tags });
    } catch (err) {
      next(err);
    }
  }

  async updateItem(req, res, next) {
    try {
      const item = req.body.item;
      const { id, itemName, tags, ...optField } = item;
      const itemProp = {
        id,
        itemName,
        tags: tags.split(' '),
      };
      await collectionService.updateItem(itemProp);
      if (!_.isEmpty(optField)) {
        for (let [key, val] of Object.entries(optField)) {
          await collectionService.updateOptField(itemProp.id, key, val);
        }
      }
      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const id = req.body.id;
      await collectionService.removeItem(id);
      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  async deleteCollection(req, res, next) {
    try {
      const { id, userId } = req.body;
      await collectionService.removeCollection(id);
      const collections = await collectionService.findColections(userId);
      return res.status(200).json({ collections });
    } catch (err) {
      next(err);
    }
  }

  async getItemData(req, res, next) {
    try {
      const id = req.params.itemId;
      let item = await collectionService.findItem(id);
      return res.status(200).json({ item });
    } catch (err) {
      next(err);
    }
  }

  async getLastItems(req, res, next) {
    try {
      const last = await collectionService.findLastItems();
      return res.status(200).json(last);
    } catch (err) {
      next(err);
    }
  }

  async addLike(req, res, next) {
    try {
      const { itemId, fromUser } = req.body;
      await collectionService.newLike(fromUser, itemId);
      const withNewLike = await collectionService.findItem(itemId);
      const io = req.app.get('socketio');
      io.emit('add-like', { withNewLike });
      return res.status(200).json(withNewLike);
    } catch (err) {
      next(err);
    }
  }

  async removeLike(req, res, next) {
    try {
      const { itemId, fromUser } = req.body;
      await collectionService.deleteLike(fromUser, itemId);
      const withNewLike = await collectionService.findItem(itemId);
      const io = req.app.get('socketio');
      io.emit('remove-like', { withNewLike });
      return res.status(200).json(withNewLike);
    } catch (err) {
      next(err);
    }
  }
}
