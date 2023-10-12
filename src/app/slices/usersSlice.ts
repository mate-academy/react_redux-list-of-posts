import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from '../thunks/usersThunk';

type UsersState = {
  users: User[],
  isLoading: boolean,
  hasError: boolean
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  hasError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          users: action.payload,
        };
      })
      .addCase(fetchUsers.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      });
  },
});

export default userSlice.reducer;
