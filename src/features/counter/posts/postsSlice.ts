import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.hasError = false;
      state.loaded = true;
    },
    setPostsError: state => {
      state.hasError = true;
      state.loaded = true;
    },
    startLoading: state => {
      state.loaded = false;
      state.hasError = false;
    },
  },
});
export default postsSlice.reducer;

export const { setPosts, setPostsError, startLoading } = postsSlice.actions;
