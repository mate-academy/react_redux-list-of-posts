/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

type SomeUsers = {
  user: User | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: SomeUsers = {
  user: null,
  loaded: false,
  hasError: false,
};

export const initUsers = createAsyncThunk(
  'someUser/fetch',
  async (userId: number) => {
    return getUser(userId);
  },
);

const someUserSlice = createSlice({
  name: 'someUser',
  initialState,
  reducers: {
    setSomeUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      state.loaded = true;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loaded = false;
    });

    builder.addCase(initUsers.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default someUserSlice;
export const { setSomeUser } = someUserSlice.actions;
