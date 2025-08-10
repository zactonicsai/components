import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, User, LoginCredentials } from '../types/types';
import { USERS_DATA } from '../data/users';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

// Thunk for login
export const login = (credentials: LoginCredentials) => (dispatch: any) => {
  dispatch(loginStart());
  
  // Simulate API call delay
  setTimeout(() => {
    const user = USERS_DATA.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      // Don't include password in the stored user data
      const { password, ...userWithoutPassword } = user;
      dispatch(loginSuccess(userWithoutPassword));
    } else {
      dispatch(loginFailure('Invalid username or password'));
    }
  }, 500);
};

export default authSlice.reducer;