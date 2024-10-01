import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    name: string;
    id: number;
    location: string;
    rating: number;
    imageUrl: string[];
}

interface AuthState {
    isAuthenticated: boolean;
    user: User;
    token: string | null; // Додано для зберігання токена
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        name: 'Невідомий користувач',
        id: 0,
        location: 'Місце не вказано',
        rating: 0,
        imageUrl: ['/images/default.png'],
    },
    token: null, // Ініціалізація токена
};

// Інтерфейс для payload
interface LoginPayload {
    user: User;
    token: string;
}

// Async action to fetch user data
export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (email: string) => {
        const response = await axios.get(`api/Accounts/GetUserByEmail/${email}`);
        return response.data; // Це дані користувача з сервера
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: { payload: LoginPayload }) {
            state.isAuthenticated = true;
            state.user = action.payload.user; // Зберегти дані користувача
            state.token = action.payload.token; // Зберегти токен
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = initialState.user; // Скидання даних користувача
            state.token = null; // Скидання токена
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // Дані з сервера призначаються користувачу
        });
    },
});

// Експортуйте дії входу та виходу
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
