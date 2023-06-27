/* eslint-disable no-param-reassign */
import {
  // PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

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

export const init = createAsyncThunk('users/fetchUsers', async () => {
  const usersFromServer = await getUsers();

  return usersFromServer;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // set: (state: UsersState, action: PayloadAction<User[]>) => {
    //   state.users.push(...action.payload);
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Error';
      state.loading = false;
    });
  },
});

// export const { set } = usersSlice.actions;
export default usersSlice.reducer;
