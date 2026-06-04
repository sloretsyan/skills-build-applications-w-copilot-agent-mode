import { Schema, model } from 'mongoose';

export interface LeaderboardEntryDocument {
  user: string;
  team?: string;
  points: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>({
  user: { type: String, required: true },
  team: { type: String },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, required: true, default: Date.now }
});

const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;