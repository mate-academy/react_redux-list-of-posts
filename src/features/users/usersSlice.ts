/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type StateType = {
  users: User[];
  loaded: boolean;
  hasError: string;
  chosenUser: User | null;
};

const initialState: StateType = {
  users: [],
  loaded: false,
  hasError: '',
  chosenUser: null,
};

export const init = createAsyncThunk('users/fetchUsers', async () => {
  const usersFromServer = await getUsers();

  return usersFromServer;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    chooseUser: (state, action: PayloadAction<number>) => {
      state.chosenUser =
        state.users.find(user => user.id === action.payload) || null;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = false;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = 'error';
      state.loaded = false;
    });
  },
});

export const { chooseUser } = usersSlice.actions;
export default usersSlice.reducer;
