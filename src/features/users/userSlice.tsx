import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type StateProps = {
  users: User[];
};

const initialState: StateProps = {
  users: [] as User[],
};

export const fetchUsers = createAsyncThunk('fetch/users', async () => {
  return getUsers();
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    /* eslint-disable no-param-reassign */

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
