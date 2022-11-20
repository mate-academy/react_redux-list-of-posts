import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type State = null | Post;

const initialState: State = null;

type CaseReducers = SliceCaseReducers<State>;

export const selectedPostSlice = createSlice<State, CaseReducers>({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export const { actions } = selectedPostSlice;
export default selectedPostSlice.reducer;
