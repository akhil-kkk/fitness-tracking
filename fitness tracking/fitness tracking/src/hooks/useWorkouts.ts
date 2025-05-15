import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workout, WorkoutFormData } from '../types';
import { useAuth } from './useAuth';

interface WorkoutState {
  workouts: Workout[];
  addWorkout: (data: WorkoutFormData) => void;
  removeWorkout: (id: string) => void;
}

export const useWorkouts = create<WorkoutState>()(
  persist(
    (set) => ({
      workouts: [],
      addWorkout: (data: WorkoutFormData) => {
        const { user } = useAuth.getState();
        if (!user) return;

        const newWorkout: Workout = {
          id: crypto.randomUUID(),
          userId: user.id,
          date: new Date().toISOString(),
          ...data,
        };

        set((state) => ({
          workouts: [newWorkout, ...state.workouts],
        }));
      },
      removeWorkout: (id: string) => {
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id),
        }));
      },
    }),
    {
      name: 'workouts-storage',
    }
  )
);