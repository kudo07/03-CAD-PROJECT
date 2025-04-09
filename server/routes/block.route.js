import { Router } from 'express';
import {
  getAllBlocks,
  getBlockById,
  searchBlock,
} from '../controllers/block.controller.js';
const router = Router();

router.get('/', getAllBlocks);
router.get('/search', searchBlock);
router.get('/:id', getBlockById);
export default router;
