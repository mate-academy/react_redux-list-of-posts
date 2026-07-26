import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  loaded: false,
  items: [] as User[],
  error: '',
};

export const load = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(load.pending, state => {
        state.loaded = false;
        state.error = '';
      })
      .addCase(load.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(load.rejected, state => {
        state.error = 'Error';
        state.loaded = true;
      });
  },
});

export default usersSlice.reducer;
