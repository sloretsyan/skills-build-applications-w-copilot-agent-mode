import { Router } from 'express';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ username: 1 });
  res.json(users);
}));

export default router;