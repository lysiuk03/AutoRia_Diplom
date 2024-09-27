import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null; // Зберігаємо лише токен
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.isAuthenticated = true;
            state.token = action.payload; // Зберігаємо токен
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null; // Скидаємо токен
        },
        register(state, action: PayloadAction<string>) {
            state.isAuthenticated = true;
            state.token = action.payload; // Зберігаємо токен після реєстрації
        },
    },
});

// Експортуємо дії
export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
