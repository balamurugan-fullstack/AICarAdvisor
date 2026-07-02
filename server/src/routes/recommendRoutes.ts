import { Router } from 'express';
import { postRecommend } from '../controllers/recommend.controller';

const router = Router();

router.post('/recommend', postRecommend);

export default router;
