import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  loading: false,
  error: null,
  weather: null,
};

// Redux Slice for Tasks
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    // Weather Fetching Actions for Saga
    fetchWeatherRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.weather = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions for use in components
export const {
  addTask,
  deleteTask,
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure
} = taskSlice.actions;

export default taskSlice.reducer;
