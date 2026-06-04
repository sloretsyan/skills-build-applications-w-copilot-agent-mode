import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  user: string;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: String, required: true },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now }
});

const Activity = model<ActivityDocument>('Activity', activitySchema);
export default Activity;