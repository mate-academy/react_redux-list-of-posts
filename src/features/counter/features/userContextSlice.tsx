/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';

interface UserContextState {
  users: User[];
}

const initialState: UserContextState = {
  users: [],
};

// Define the async thunk for fetching users
export const fetchUsersAsync = createAsyncThunk(
  'userContext/fetchUsers',
  async () => {
    const posts = await getUsers();

    return posts;
  },
);

// Create the slice
export const userContextSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsersAsync.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
  },
});

export default userContextSlice.reducer;
