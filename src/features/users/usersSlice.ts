import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
export const { actions } = usersSlice;
