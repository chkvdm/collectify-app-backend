import express from 'express';
import SearchController from '../controllers/SearchController.js';

const router = express.Router();
const searchController = new SearchController();

router.get('/tag/:query', searchController.getTagResult);
router.get('/:query', searchController.getResult);

export default router;
