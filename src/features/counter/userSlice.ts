/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type InitialState = {
  value: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  value: [],
  loaded: false,
  hasError: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.value = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      state.loaded = true;
    });
    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loaded = false;
    });
    builder.addCase(initUsers.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});
export default userSlice.reducer;
export const { set } = userSlice.actions;
