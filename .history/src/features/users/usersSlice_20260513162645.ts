import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersState {
  users: User[];
  selectedUser: User | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setAuthor } = userSlice.actions;
