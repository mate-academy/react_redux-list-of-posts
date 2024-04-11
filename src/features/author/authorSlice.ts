/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { AppThunk, RootState } from '../../app/store';
import { actions as postsActions } from '../posts/postsSlice';

type UserId = User['id'];

type State = {
  id: UserId;
};

const initialState: State = {
  id: -1,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<UserId>) => {
      state.id = payload;
    },
    remove: () => initialState,
  },
});

export const actions = {
  ...authorSlice.actions,
  setWithPost: (userId: UserId): AppThunk => {
    return dispatch => {
      dispatch(actions.set(userId));
      dispatch(postsActions.init(userId));
    };
  },
};

export const selectors = {
  selectId: (state: RootState) => state.author.id,
  selectUser: (state: RootState) =>
    state.users.items.find(user => user.id === state.author.id) || null,
};
