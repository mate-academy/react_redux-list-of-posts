import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type Users = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: Users = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, state => {
      return { ...state, loading: true };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, loading: false, users: action.payload };
    });

    builder.addCase(init.rejected, state => {
      return { ...state, error: 'Can not download users' };
    });
  },
});

export default usersSlice.reducer;
