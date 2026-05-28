import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

interface UserState {
  items: User[];
  loaded: boolean;
  hasError: string;
}

const initialState: UserState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchUser = createAsyncThunk('users/fetchAll', () => getUsers());

export const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state: UserState) => {
      state.loaded = false;
      state.items = [];
      state.hasError = '';
    });

    builder.addCase(fetchUser.fulfilled, (state: UserState, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(fetchUser.rejected, (state: UserState) => {
      state.loaded = false;
      state.hasError = 'Список відсутній';
    });
  },
});

export default userReducer.reducer;
