/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { User } from '../types/User';

export type State = null | User;

const initialState: State = null;

type CaseReducers = SliceCaseReducers<State>;

const authorSlice = createSlice<State, CaseReducers>({
  name: 'author',
  initialState,
  reducers: {
    add: (_author, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { actions } = authorSlice;

export default authorSlice.reducer;
