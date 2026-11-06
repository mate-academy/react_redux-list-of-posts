/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}
const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
      state.loaded = true;
    },
    setError(state) {
      state.hasError = true;
      state.loaded = true;
    },
    setLoading: state => {
      state.loaded = false;
    },
  },
});

export const { setPosts, setError, setLoading } = postsSlice.actions;
export default postsSlice.reducer;
