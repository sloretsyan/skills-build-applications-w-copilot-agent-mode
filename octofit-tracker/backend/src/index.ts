import express from 'express';
import mongoose from 'mongoose';
import Workout from './models/Workout.js';

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit';
mongoose.set('strictQuery', false);

mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected on port 27017'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
