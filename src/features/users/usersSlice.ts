import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [] as User[],
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  const usersFromServer = await getUsers();

  return usersFromServer;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      loadUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(loadUsers.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
