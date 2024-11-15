import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
