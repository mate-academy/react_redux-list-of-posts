import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

type UserStatus = {
  users: User[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: UserStatus = {
  users: [],
  loaded: false,
  hasError: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loaded = false;
      state.hasError = 'Failed to load users';
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
