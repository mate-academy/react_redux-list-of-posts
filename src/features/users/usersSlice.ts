/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../../app/store';
import { ApiFeatureState } from '../../types/ApiFeatureState';

type State = ApiFeatureState<User[]>;

const REDUCER_NAME = 'users';

const initialState: State = {
  hasError: false,
  loaded: false,
  items: [],
};

const init = createAsyncThunk(`${REDUCER_NAME}/init`, async () => {
  const result = await getUsers();

  return result;
});

export const usersSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, () => ({
      hasError: false,
      loaded: false,
      items: [],
    }));

    builder.addCase(init.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const selectors = {
  selectUsers: (state: RootState) => state.users.items,
};

export const actions = {
  ...usersSlice.actions,
  init,
};
