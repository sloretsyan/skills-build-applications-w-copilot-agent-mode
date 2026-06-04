import { Router } from 'express';
import Activity from '../models/Activity.js';
import asyncHandler from './asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const activities = await Activity.find().sort({ date: -1 });
  res.json(activities);
}));

export default router;