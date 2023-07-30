/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface CounterState {
  users: User[] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  users: [],
  status: 'idle',
};

export const getFromServerUsers = createAsyncThunk(
  'comment/fetch',
  async () => {
    const value = await getUsers().then(users => users);

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    remove: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFromServerUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFromServerUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(getFromServerUsers.rejected, (state) => {
        state.status = 'failed';
        state.users = [];
      });
  },
});

export const { add, remove } = usersSlice.actions;

export default usersSlice.reducer;
