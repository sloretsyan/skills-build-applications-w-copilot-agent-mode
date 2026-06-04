import { Router } from 'express';
import Team from '../models/Team.js';
import asyncHandler from './asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const teams = await Team.find().sort({ name: 1 });
  res.json(teams);
}));

export default router;