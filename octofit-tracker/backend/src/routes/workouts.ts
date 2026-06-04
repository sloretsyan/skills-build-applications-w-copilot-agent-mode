import { Router } from 'express';
import Workout from '../models/Workout.js';
import asyncHandler from './asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const workouts = await Workout.find().sort({ date: -1 });
  res.json(workouts);
}));

export default router;