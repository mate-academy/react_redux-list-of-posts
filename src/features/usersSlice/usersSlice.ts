import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersState {
  users: User[];
  loading: boolean;
  error: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('users/fetch', async () => {
  const response = await getUsers();

  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.users = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
      })
      .addCase(init.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.error = true;
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
