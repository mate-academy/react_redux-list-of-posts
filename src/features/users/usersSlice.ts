import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const init = createAsyncThunk('users/fetch', () => getUsers());

type UsersState = {
  items: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: bulder => {
    bulder.addCase(init.pending, state => {
      state.loading = true;
    });

    bulder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.items = action.payload;
    });

    bulder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error loading data from server';
    });
  },
});

export default usersSlice.reducer;
