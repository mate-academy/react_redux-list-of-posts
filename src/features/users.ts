import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  usersList: User[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  usersList: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.usersList = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Щось пішло не так';
      });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
