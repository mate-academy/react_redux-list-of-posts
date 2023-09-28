import { createSlice } from '@reduxjs/toolkit';

import { fetchUsers } from './users-operations';

import { User } from '../../types/User';

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: (action.payload as { error: string }).error,
        };
      });
  },
});

export default usersSlice.reducer;
