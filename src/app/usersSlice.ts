import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserState = {
  items: User[];
  loading: boolean;
  hasError: string;
};

const initialState: UserState = {
  items: [],
  loading: false,
  hasError: '',
};

export const loadUsers = createAsyncThunk<User[], void>(
  'users/fetch',
  async (): Promise<User[]> => {
    const response = await getUsers();

    return response;
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loading = true;
        state.hasError = '';
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.hasError = '';
      })
      .addCase(loadUsers.rejected, state => {
        state.loading = false;
        state.hasError = 'Something were wrong!';
      });
  },
});

export default userSlice.reducer;
