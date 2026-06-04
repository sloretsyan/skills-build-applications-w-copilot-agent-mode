import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { connectDatabase } from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  next();
});

const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

connectDatabase()
  .then(() => console.log('MongoDB connected to octofit_db on port 27017'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.get('/api', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running',
    baseUrl,
    endpoints: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/'
    ]
  });
});

app.use('/api/users/', usersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/api/activities/', activitiesRouter);
app.use('/api/leaderboard/', leaderboardRouter);
app.use('/api/workouts/', workoutsRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('API error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Backend listening on ${baseUrl}`);
});