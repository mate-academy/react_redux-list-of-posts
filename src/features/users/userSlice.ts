import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  loading: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      if (!state.loading) {
        state.loading = true;
        state.loaded = false;
        state.hasError = false;
      }
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (state.loading) {
        state.items = action.payload;
        state.loading = false;
        state.loaded = true;
      }
    });
    builder.addCase(fetchUsers.rejected, state => {
      if (state.loading) {
        state.loaded = true;
        state.hasError = true;
        state.loading = false;
      }
    });
  },
});

export default usersSlice.reducer;
export type { UsersState };
