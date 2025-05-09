import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { wait } from '../utils/fetchClient';

export interface UserListState {
  userList: User[];
}

const initialState: UserListState = {
  userList: [],
};

export const init = createAsyncThunk('users/fetch', async () => {
  await wait(500);

  // eslint-disable-next-line @typescript-eslint/return-await
  return await getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
