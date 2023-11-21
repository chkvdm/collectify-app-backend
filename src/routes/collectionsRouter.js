import express from 'express';
import passport from 'passport';
import CollectionsController from '../controllers/CollectionsController.js';
import { upload } from '../middleware/imageLoader.js';

const router = express.Router();
const collectionsController = new CollectionsController();

router.get('/themes', collectionsController.getThemes);

router.get('/types', collectionsController.getTypes);

router.get('/all-collections/:userId', collectionsController.getAllCollections);

router.get('/collection/:collectionId', collectionsController.getCollection);

router.get(
  '/collection-item-header/:collectionId',
  collectionsController.getItemTableHeader
);

router.get(
  '/collection-item-data/:collectionId',
  collectionsController.getItemTableData
);

router.get('/get-item-data/:itemId', collectionsController.getItemData);

router.get('/last-items', collectionsController.getLastItems);

router.post(
  '/:userId/create-collection',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  collectionsController.createCollection
);

router.post(
  '/new-item/:collectionId',
  passport.authenticate('jwt', { session: false }),
  collectionsController.createItem
);

router.put(
  '/item-update',
  passport.authenticate('jwt', { session: false }),
  collectionsController.updateItem
);

router.post(
  '/add-like',
  passport.authenticate('jwt', { session: false }),
  collectionsController.addLike
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  collectionsController.deleteCollection
);

router.delete(
  '/remove-like',
  passport.authenticate('jwt', { session: false }),
  collectionsController.removeLike
);

router.delete(
  '/delete-item',
  passport.authenticate('jwt', { session: false }),
  collectionsController.deleteItem
);

export default router;
