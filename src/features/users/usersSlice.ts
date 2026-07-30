import { createSlice } from '@reduxjs/toolkit';

import { fetchUsers } from './usersThunk';

interface UsersState {
  items: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }[];

  loaded: boolean;

  hasError: boolean;
}

const initialState: UsersState = {
  items: [],

  loaded: false,

  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      .addCase(fetchUsers.pending, state => {
        state.loaded = false;

        state.hasError = false;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;

        state.loaded = true;
      })

      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;

        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
