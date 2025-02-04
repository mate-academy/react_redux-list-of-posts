import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface Users {
  users: User[];
  loading: boolean;
  error: string
}

const initialState: Users = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', getUsers);


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
})


export default usersSlice.reducer;
