import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[] | [],
    loaded: true,
    isError: false,
  },
  reducers: {
    setLoaded(state, action) {
      return { ...state, loaded: action.payload };
    },
    setError(state, action) {
      return { ...state, hasError: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => ({
        ...state,
        loaded: false,
      }))
      .addCase(getUsers.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        users: action.payload,
      }))
      .addCase(getUsers.rejected, state => ({
        ...state,
        isError: true,
      }));
  },
});

export const usersReducer = usersSlice.reducer;
export const { setLoaded, setError } = usersSlice.actions;
