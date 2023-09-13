import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const usersThunk = createAsyncThunk('users/getUsers',
  async () => {
    const resolve = await getUsers();

    return resolve;
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
      state.loading = false; // eslint-disable-line
    });

    builder.addCase(usersThunk.fulfilled, (state, action) => {
      state.users = action.payload; // eslint-disable-line
      state.loading = true; // eslint-disable-line
    });

    builder.addCase(usersThunk.rejected, (state) => {
      state.loading = false; // eslint-disable-line
      state.error = 'Something went wrong!'; // eslint-disable-line
    });
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
