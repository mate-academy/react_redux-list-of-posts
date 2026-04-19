import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk('users/fetchAll', getUsers);

export interface UsersState {
  items: User[];
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
    builder.addCase(fetchUsers.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        items: action.payload,
        hasError: false,
      };
    });

    builder.addCase(fetchUsers.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export default usersSlice.reducer;
