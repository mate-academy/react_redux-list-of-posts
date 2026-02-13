import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface UserProps {
  user: User[];
  loader: boolean;
  error: string;
}

const initialState: UserProps = {
  user: [],
  loader: false,
  error: '',
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const user = await getUsers();

  return user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loader = false;
      state.error = '';
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loader = false;
      state.user = action.payload;
      state.error = '';
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loader = true;
      state.error = action.error.message || 'Failed to fetch user';
    });
  },
});

export default userSlice.reducer;
