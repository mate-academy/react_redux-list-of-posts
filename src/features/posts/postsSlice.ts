import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface Posts {
  selectedPost: Post | null;
  posts: Post[];
}

const initialState: Posts = {
  selectedPost: null,
  posts: [],
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    resetSelectedPost: (state) => {
      return {
        ...state,
        selectedPost: null,
      };
    },
  },
});

export default postsSlice.reducer;
export const {
  setSelectedPost,
  setPosts,
  resetSelectedPost,
} = postsSlice.actions;
export const currentPost = (state: RootState) => state.post.selectedPost;
export const allPost = (state: RootState) => state.post.posts;
