import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import taskSaga from './taskSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with reducers and middleware
export const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication state
    tasks: taskReducer, // Task management state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the task saga middleware
sagaMiddleware.run(taskSaga);

export default store;
