import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const init = createAsyncThunk('users/fetch', () => getUsers());

type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.items = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error loading data from server';
    });
  },
});

export default usersSlice.reducer;
