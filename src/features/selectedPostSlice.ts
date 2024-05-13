import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = Post | null;

const selectedPost = createSlice<State, SliceCaseReducers<State>, string>({
  name: 'selectedPost',
  initialState: null,
  reducers: {
    setSelectedPost(_, action: PayloadAction<Post>) {
      return action.payload;
    },
  },
});

export default selectedPost.reducer;
export const { setSelectedPost } = selectedPost.actions;
