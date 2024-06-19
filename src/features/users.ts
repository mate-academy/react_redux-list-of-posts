import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const init = createAsyncThunk('users/fetched', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(init.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
