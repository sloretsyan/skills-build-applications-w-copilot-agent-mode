import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const users = [
  {
    username: 'mona',
    email: 'mona@octofit.local',
    firstName: 'Mona',
    lastName: 'Octocat',
    team: 'Trail Blazers',
    createdAt: new Date('2026-05-01T08:00:00.000Z')
  },
  {
    username: 'hubert',
    email: 'hubert@octofit.local',
    firstName: 'Hubert',
    lastName: 'Runner',
    team: 'Trail Blazers',
    createdAt: new Date('2026-05-02T09:15:00.000Z')
  },
  {
    username: 'nina',
    email: 'nina@octofit.local',
    firstName: 'Nina',
    lastName: 'Summit',
    team: 'Core Crushers',
    createdAt: new Date('2026-05-03T10:30:00.000Z')
  },
  {
    username: 'diego',
    email: 'diego@octofit.local',
    firstName: 'Diego',
    lastName: 'Stride',
    team: 'Core Crushers',
    createdAt: new Date('2026-05-04T11:45:00.000Z')
  }
];

const teams = [
  {
    name: 'Trail Blazers',
    description: 'Outdoor-focused athletes logging runs, hikes, and cycling sessions.',
    members: ['mona', 'hubert'],
    createdAt: new Date('2026-05-01T08:30:00.000Z')
  },
  {
    name: 'Core Crushers',
    description: 'Strength and conditioning teammates focused on consistency.',
    members: ['nina', 'diego'],
    createdAt: new Date('2026-05-03T10:45:00.000Z')
  }
];

const activities = [
  {
    user: 'mona',
    activityType: 'Trail run',
    durationMinutes: 42,
    caloriesBurned: 410,
    date: new Date('2026-05-20T06:30:00.000Z')
  },
  {
    user: 'hubert',
    activityType: 'Cycling',
    durationMinutes: 58,
    caloriesBurned: 520,
    date: new Date('2026-05-21T17:15:00.000Z')
  },
  {
    user: 'nina',
    activityType: 'Strength training',
    durationMinutes: 50,
    caloriesBurned: 360,
    date: new Date('2026-05-22T12:00:00.000Z')
  },
  {
    user: 'diego',
    activityType: 'Rowing',
    durationMinutes: 35,
    caloriesBurned: 330,
    date: new Date('2026-05-23T07:45:00.000Z')
  }
];

const leaderboardEntries = [
  {
    user: 'hubert',
    team: 'Trail Blazers',
    points: 1420,
    rank: 1,
    updatedAt: new Date('2026-05-24T08:00:00.000Z')
  },
  {
    user: 'mona',
    team: 'Trail Blazers',
    points: 1365,
    rank: 2,
    updatedAt: new Date('2026-05-24T08:00:00.000Z')
  },
  {
    user: 'nina',
    team: 'Core Crushers',
    points: 1280,
    rank: 3,
    updatedAt: new Date('2026-05-24T08:00:00.000Z')
  },
  {
    user: 'diego',
    team: 'Core Crushers',
    points: 1215,
    rank: 4,
    updatedAt: new Date('2026-05-24T08:00:00.000Z')
  }
];

const workouts = [
  {
    name: 'Hill Sprint Intervals',
    durationMinutes: 30,
    caloriesBurned: 340,
    date: new Date('2026-05-25T06:30:00.000Z')
  },
  {
    name: 'Full-Body Strength Circuit',
    durationMinutes: 45,
    caloriesBurned: 390,
    date: new Date('2026-05-26T12:15:00.000Z')
  },
  {
    name: 'Recovery Yoga Flow',
    durationMinutes: 25,
    caloriesBurned: 120,
    date: new Date('2026-05-27T18:00:00.000Z')
  },
  {
    name: 'Endurance Ride',
    durationMinutes: 60,
    caloriesBurned: 560,
    date: new Date('2026-05-28T07:00:00.000Z')
  }
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const insertedUsers = await User.insertMany(users);
  const insertedTeams = await Team.insertMany(teams);
  const insertedActivities = await Activity.insertMany(activities);
  const insertedLeaderboardEntries = await LeaderboardEntry.insertMany(leaderboardEntries);
  const insertedWorkouts = await Workout.insertMany(workouts);

  console.log(`Inserted ${insertedUsers.length} users`);
  console.log(`Inserted ${insertedTeams.length} teams`);
  console.log(`Inserted ${insertedActivities.length} activities`);
  console.log(`Inserted ${insertedLeaderboardEntries.length} leaderboard entries`);
  console.log(`Inserted ${insertedWorkouts.length} workouts`);
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    return mongoose.disconnect();
  });