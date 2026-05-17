import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const userSlices = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.users = action.payload;
      },
    );
  },
});

export default userSlices.reducer;
