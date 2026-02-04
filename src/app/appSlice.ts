import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export interface AppState {
  users: User[];
  author: number | null;
  posts: {
    loaded: boolean;
    hasError: boolean;
    items: Post[];
  };

  selectedPost: number | null;

  comments: {
    loaded: boolean;
    hasError: boolean;
    items: Comment[];
  };
}

const initialState: AppState = {
  users: [],
  author: null,
  posts: {
    loaded: false,
    hasError: false,
    items: [],
  },

  selectedPost: null,

  comments: {
    loaded: false,
    hasError: false,
    items: [],
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setAuthor(state, action: PayloadAction<number>) {
      state.author = action.payload;
    },
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts.hasError = false;
      state.posts.loaded = true;
      state.posts.items = action.payload;
    },
    setSelectedPost(state, action: PayloadAction<number>) {
      state.selectedPost = action.payload;
    },
    clearAuthor(state) {
      state.author = null;
    },
    setPostsLoading(state) {
      state.posts.loaded = false;
      state.posts.hasError = false;
    },
    setPostsError(state) {
      state.posts.hasError = true;
      state.posts.loaded = true;
    },
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
    setCommentsLoading(state) {
      state.comments.loaded = false;
      state.comments.hasError = false;
    },
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments.hasError = false;
      state.comments.loaded = true;
      state.comments.items = action.payload;
    },
    setCommentsError(state) {
      state.comments.hasError = true;
      state.comments.loaded = true;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.items.push(action.payload);
    },
    removeComment(state, action: PayloadAction<number>) {
      state.comments.items = state.comments.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
});

export const {
  setUsers,
  setAuthor,
  setPosts,
  setSelectedPost,
  clearAuthor,
  setPostsLoading,
  setPostsError,
  clearSelectedPost,
  setCommentsLoading,
  setComments,
  setCommentsError,
  addComment,
  removeComment,
} = appSlice.actions;

export default appSlice.reducer;
