import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

/* eslint-disable no-param-reassign */

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  expanded: boolean;
  items: Post[];
  selectedPost: Post | null;
  comments: Comment[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  expanded: false,
  items: [],
  selectedPost: null,
  comments: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setExpanded: (state, action: PayloadAction<boolean>) => {
      state.expanded = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComments: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    toggleExpanded: state => {
      state.expanded = !state.expanded;
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(it => {
        return it.id !== action.payload;
      });
    },
  },
});

export const {
  setPosts,
  setError,
  setLoaded,
  setSelectedPost,
  setExpanded,
  toggleExpanded,
  setComments,
  addComments,
  removeComment,
} = postsSlice.actions;
export default postsSlice.reducer;
