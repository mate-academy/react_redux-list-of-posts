import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

type InitialState = {
  users: User[];
  selectedUser: User | null;
};
const initialState: InitialState = {
  users: [],
  selectedUser: null,
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state, { payload }) => ({
      ...state,
      selectedUser: payload,
    }),
  },

  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export default usersSlice.reducer;
export const { selectUser } = usersSlice.actions;
