import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    return getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
