/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', async () => {
  const value = await getUsers();

  return value;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, state => {
        state.error = 'Cannot load users';
        state.loading = false;
      });
  },
});

export const { set } = userSlice.actions;
export default userSlice.reducer;
