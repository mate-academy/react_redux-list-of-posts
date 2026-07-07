import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../types/State';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { APP_SLICE_NAME } from '../../features/counter/config';

const initialState: State = {
  users: [],
  author: null,

  posts: {
    items: [],
    loaded: false,
    hasError: false,
  },

  selectedPost: null,

  comments: {
    items: [],
    loaded: false,
    hasError: false,
  },
};

const AppSlice = createSlice({
  name: APP_SLICE_NAME,
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts.items = action.payload;
      state.posts.loaded = true;
    },
    setPostsError: (state, action: PayloadAction<boolean>) => {
      state.posts.hasError = action.payload;
    },
    setPostsLoaded: (state, action: PayloadAction<boolean>) => {
      state.posts.loaded = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments.items = action.payload;
      state.comments.loaded = true;
    },
    setCommentsError: (state, action: PayloadAction<boolean>) => {
      state.comments.hasError = action.payload;
    },
    setCommentsLoaded: (state, action: PayloadAction<boolean>) => {
      state.comments.loaded = action.payload;
    },
  },
});

export const {
  setPosts,
  setPostsError,
  setUsers,
  setAuthor,
  setSelectedPost,
  setComments,
  setCommentsError,
  setCommentsLoaded,
  setPostsLoaded,
} = AppSlice.actions;

export default AppSlice.reducer;
