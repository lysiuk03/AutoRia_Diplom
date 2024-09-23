// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Інтерфейс для стану авторизації
interface AuthState {
    isAuthenticated: boolean;
}

// Початковий стан для авторизації
const initialState: AuthState = {
    isAuthenticated: false,  // За замовчуванням користувач не авторизований
};

// Створення slice для авторизації
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

// Експорт екшенів для авторизації
export const { login, logout } = authSlice.actions;

// Експорт редюсера
export default authSlice.reducer;
