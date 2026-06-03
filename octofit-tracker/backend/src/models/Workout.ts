import { Schema, model } from 'mongoose';

interface WorkoutDocument {
  name: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now }
});

const Workout = model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
