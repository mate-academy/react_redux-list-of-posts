import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
      state.hasError = false;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
// export const {} = usersSlice.actions;
