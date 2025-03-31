import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  users: [] as User[],
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set(state, { payload }: PayloadAction<User[]>) {
      state.users.push(...payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;
