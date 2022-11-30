import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UserState = {
  users: User[],
};

const initialState: UserState = {
  users: [],
};

export const init = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users.push(...action.payload);
      });
  },
});

export default userSlice.reducer;
