// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './pages/AuthPage/authSlice';

// Створення store з використанням authReducer
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Тип для стану RootState на основі store
export type RootState = ReturnType<typeof store.getState>;

// Тип для dispatch
export type AppDispatch = typeof store.dispatch;

export default store;
