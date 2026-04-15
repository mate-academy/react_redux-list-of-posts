/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk(
  'users/fetch', 
  async (_, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    loaded: false,
    hasError: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loaded = false; // Завантаження триває
        state.hasError = false;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true; // Завантаження успішно завершено
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loaded = true; // Спроба завантаження завершена (хоч і невдало)
        state.hasError = true;
        state.error = (action.payload as string) || 'Failed to fetch users';
      });
  },
});

export default usersSlice.reducer;
