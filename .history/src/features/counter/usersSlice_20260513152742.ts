import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../api/users';
import { User } from '../../types/User';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;

export const init = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUser();
  return users;
});
