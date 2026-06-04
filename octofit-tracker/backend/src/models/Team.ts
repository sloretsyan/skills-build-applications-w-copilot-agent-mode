import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: [{ type: String }],
  createdAt: { type: Date, required: true, default: Date.now }
});

const Team = model<TeamDocument>('Team', teamSchema);
export default Team;