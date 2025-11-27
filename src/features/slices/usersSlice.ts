import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser, getUsers } from '../../api/users';
import { RootState } from '../../app/store';

export interface UsersState {
  items: User[];
  selectedUser: User | null;
  loaded: boolean;
  hasError: string | null;
}

const initialState: UsersState = {
  items: [],
  selectedUser: null,
  loaded: false,
  hasError: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id: number) => {
    const response = await getUser(id);

    return response;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = false;
        state.hasError = 'Users can not be found';
      })

      .addCase(fetchUserById.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loaded = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, state => {
        state.loaded = false;
        state.hasError = 'A user can not be found';
      });
  },
});

export const selectUsersList = (state: RootState) => state.users.items;
export const selectUsersLoading = (state: RootState) => state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;
export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUser;

export const { setSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
