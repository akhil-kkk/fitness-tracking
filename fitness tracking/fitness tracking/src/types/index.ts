export interface User {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
}

export interface Workout {
  id: string;
  userId: string;
  type: 'cardio' | 'strength' | 'flexibility';
  name: string;
  duration: number;
  caloriesBurned: number;
  date: string;
  notes?: string;
}

export interface WorkoutFormData {
  type: Workout['type'];
  name: string;
  duration: number;
  caloriesBurned: number;
  notes?: string;
}