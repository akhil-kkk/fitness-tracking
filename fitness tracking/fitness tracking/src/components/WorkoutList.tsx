import React from 'react';
import { useWorkouts } from '../hooks/useWorkouts';
import { Calendar, Clock, Flame, Trash2, Filter } from 'lucide-react';
import { Workout } from '../types';

export function WorkoutList() {
  const { workouts, removeWorkout } = useWorkouts();
  const [filter, setFilter] = React.useState<'all' | 'cardio' | 'strength' | 'flexibility'>('all');
  const [sortBy, setSortBy] = React.useState<'date' | 'duration' | 'calories'>('date');

  const filteredAndSortedWorkouts = React.useMemo(() => {
    let filtered = filter === 'all' 
      ? workouts 
      : workouts.filter(w => w.type === filter);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'duration':
          return b.duration - a.duration;
        case 'calories':
          return b.caloriesBurned - a.caloriesBurned;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [workouts, filter, sortBy]);

  const handleDelete = (workout: Workout) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      removeWorkout(workout.id);
    }
  };

  const groupWorkoutsByDate = (workouts: Workout[]) => {
    const groups: { [key: string]: Workout[] } = {};
    workouts.forEach(workout => {
      const date = new Date(workout.date).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(workout);
    });
    return groups;
  };

  const groupedWorkouts = groupWorkoutsByDate(filteredAndSortedWorkouts);

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No workouts logged yet. Start by adding your first workout!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Types</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="date">Date</option>
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
          </select>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedWorkouts).map(([date, workouts]) => (
          <div key={date} className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">{date}</h3>
            <div className="space-y-3">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{workout.name}</h3>
                      <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-indigo-100 text-indigo-800">
                        {workout.type}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center">
                        <Flame className="h-4 w-4 mr-1" />
                        {workout.caloriesBurned} cal
                      </span>
                    </div>
                    {workout.notes && (
                      <p className="mt-2 text-sm text-gray-600">{workout.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(workout)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors duration-150"
                    title="Delete workout"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}