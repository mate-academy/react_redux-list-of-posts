import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = Post | null;

const selectedPostSlice = createSlice<State, SliceCaseReducers<State>, string>({
  name: 'selectedPosts',
  initialState: null,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<State>) => {
      return action.payload;
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
