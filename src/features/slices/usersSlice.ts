/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  isLoading: boolean;
  author: User | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  author: null,
};

export const gettingUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(gettingUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gettingUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      });
  },
});

export const { select } = usersSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: RootState) => state.users.users;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default usersSlice.reducer;
