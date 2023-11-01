import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type State = {
  usersList: User[],
};

const initialState: State = {
  usersList: [],
};

export const fetchUsers = createAsyncThunk('fetchUsers', getUsers);

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state: State, action: PayloadAction<User[]>) => {
        // eslint-disable-next-line
        state.usersList = action.payload;
      },
    );
  },
});

export default usersSlice.reducer;
