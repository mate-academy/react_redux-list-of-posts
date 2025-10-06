/* eslint-disable no-param-reassign */
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { AppThunk } from '../app/store';
import { getUsers } from '../api/users';

export interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  status: 'idle',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = 'loading';
    },
    setSucceed(state) {
      state.status = 'idle';
    },
    setError(state) {
      state.status = 'failed';
    },
    set(state, { payload }: PayloadAction<User[]>) {
      state.users = payload;
    },
  },
});

export const { setLoading, setSucceed, setError, set } = userSlice.actions;

export const init = (): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading());
      const users = await getUsers();

      dispatch(set(users));
      dispatch(setSucceed());
    } catch {
      dispatch(setError());
    }
  };
};

export default userSlice.reducer;
