import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type State = {
  loaded: boolean,
  hasError: boolean,
  usersList: User[],
  selectedUser: User | null,
};

const initialState: State = {
  loaded: true,
  hasError: false,
  usersList: [],
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk('fetchUsers', getUsers);

/* eslint-disable no-param-reassign */
const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setUser: (state: State, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: State) => {
        state.loaded = false;
      })
      .addCase(fetchUsers.rejected, (state: State) => {
        state.hasError = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: State, action: PayloadAction<User[]>) => {
          state.usersList = action.payload;
        },
      );
  },
});

export default usersSlice.reducer;
export const { setUser } = usersSlice.actions;
