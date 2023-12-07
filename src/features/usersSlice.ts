import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { fetchUsers } from '../utils/thunks';

type Users = {
  users: User[],
  isLoading: boolean,
  hasError: boolean,
};

const startState: Users = {
  users: [],
  isLoading: false,
  hasError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState: startState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: true,
        users: action.payload,
        hasError: false,
      };
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
  },
});

export default userSlice.reducer;
