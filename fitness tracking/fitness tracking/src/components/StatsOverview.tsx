import React from 'react';
import { useWorkouts } from '../hooks/useWorkouts';
import { Activity, Flame, Clock, TrendingUp, Award } from 'lucide-react';

export function StatsOverview() {
  const { workouts } = useWorkouts();

  const stats = React.useMemo(() => {
    const now = new Date();
    const thisWeek = workouts.filter(w => {
      const workoutDate = new Date(w.date);
      return now.getTime() - workoutDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
    });

    const workoutTypes = workouts.reduce((acc, w) => {
      acc[w.type] = (acc[w.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favoriteType = Object.entries(workoutTypes).sort((a, b) => b[1] - a[1])[0]?.[0];

    const longestStreak = workouts.reduce((streak, workout) => {
      const date = new Date(workout.date);
      if (!streak.currentStart) {
        streak.currentStart = date;
        streak.currentLength = 1;
      } else {
        const daysDiff = Math.floor((streak.currentStart.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          streak.currentLength++;
          streak.currentStart = date;
        } else if (daysDiff > 1) {
          if (streak.currentLength > streak.maxLength) {
            streak.maxLength = streak.currentLength;
          }
          streak.currentLength = 1;
          streak.currentStart = date;
        }
      }
      return streak;
    }, { currentStart: null as Date | null, currentLength: 0, maxLength: 0 });

    return {
      total: workouts.length,
      thisWeek: thisWeek.length,
      totalCalories: workouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
      totalMinutes: workouts.reduce((sum, w) => sum + w.duration, 0),
      favoriteType: favoriteType || 'None',
      streak: Math.max(longestStreak.currentLength, longestStreak.maxLength),
    };
  }, [workouts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Workouts
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stats.total}
                  </div>
                  <div className="ml-2 text-sm text-gray-500">
                    ({stats.thisWeek} this week)
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Longest Streak
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stats.streak} days
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Calories
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stats.totalCalories}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Minutes
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stats.totalMinutes}
                  </div>
                  <div className="ml-2 text-sm text-gray-500">
                    ({Math.round(stats.totalMinutes / 60)} hours)
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}