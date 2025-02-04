import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface Users {
  users: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: Users = {
  users: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', getUsers);


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = false;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
})


export default usersSlice.reducer;
