import { Router } from 'express';
import { uploadFile } from '../controllers/cad.controller.js';
import { upload } from '../middlewares/upload.js';
const router = Router();
// router.post('/upload', uploadFile);
router.post('/upload-cad', upload.single('file'), uploadFile);
export default router;
