import { createSlice } from '@reduxjs/toolkit';

import { loadUsers } from './usersThunk';
import { User } from '../../types/User';

export interface UsersState {
  value: User[];
  status: 'idle' | 'loading' | 'failed' | 'loaded';
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        /* eslint-disable no-param-reassign */
        state.status = 'loading';
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.value = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
