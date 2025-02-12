import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  selectedUser: User | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
};

export const init = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    add: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    });
    /* eslint-enable no-param-reassign */
  },
});

export default usersSlice.reducer;
export const { add, selectUser } = usersSlice.actions;
