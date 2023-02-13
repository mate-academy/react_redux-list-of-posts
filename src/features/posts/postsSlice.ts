import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

type PostState = {
  selected: Post | null;
};

const initialState: PostState = {
  selected: null,
};

export const postsSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selected: action.payload };
    },
  },
});

export const selectPost = (state: RootState) => state.currentPost.selected;
export const selectPostId = (state: RootState) => (
  state.currentPost.selected?.id || 0
);

export const { setPost } = postsSlice.actions;
