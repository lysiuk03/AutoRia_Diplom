import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        name: string;
        email: string;
    } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
