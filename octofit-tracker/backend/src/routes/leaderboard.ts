import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import asyncHandler from './asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1, points: -1 });
  res.json(leaderboard);
}));

export default router;