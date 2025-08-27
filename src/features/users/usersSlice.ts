import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => getUsers(),
  {
    condition: (_, { getState }) => {
      // @ts-expect-error Redux Toolkit getState type is not inferred here
      const { users } = getState();

      return !users.loaded;
    },
  },
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
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        if (!state.loaded) {
          return { ...state, loaded: false, hasError: false };
        }

        return state;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return { ...state, loaded: true, items: action.payload };
      })
      .addCase(fetchUsers.rejected, state => {
        return { ...state, loaded: false, hasError: true };
      });
  },
});

export default usersSlice.reducer;
