import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../api/users';

interface UsersState {
  users: string[];
}

const initialState: UsersState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfille, (state, action) => {});
  },
});

export default userSlice.reducer;

export const init = createAsyncThunk('users/fetch', () => {
  return getUser();
});
