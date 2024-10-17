/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type CurrentPost = {
  post: Post | null;
};

const initialState: CurrentPost = {
  post: null,
};

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<CurrentPost>) => {
      if (
        state.post &&
        action.payload &&
        state.post.id === action.payload.post?.id
      ) {
        state.post = null;
      } else {
        state.post = action.payload.post;
      }
    },
  },
});

export default currentPostSlice.reducer;
export const { selectPost } = currentPostSlice.actions;
