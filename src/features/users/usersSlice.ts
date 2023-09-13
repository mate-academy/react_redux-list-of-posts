import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const usersThunk = createAsyncThunk('users/getUsers', () => {
  return getUsers();
});

type UsersState = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      const result = state;

      result.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(usersThunk.pending, (state) => {
      const result = state;

      result.loading = true;
    });

    builder.addCase(usersThunk.fulfilled, (state, action) => {
      const result = state;

      result.users = action.payload;
      result.loading = false;
    });

    builder.addCase(usersThunk.rejected, (state) => {
      const result = state;

      result.loading = false;
      result.error = 'Something went wrong!';
    });
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
