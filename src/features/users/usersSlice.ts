import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => getUsers(),
  {
    condition: (_, { getState }) => {
      // @ts-ignore
      const { users } = getState();
      return !users.loaded;
    },
  }
);

interface UsersState {
  loaded: boolean;
  hasError: boolean;
  items: User[];
}

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        if (!state.loaded) {
          state.loaded = false;
          state.hasError = false;
        }
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
