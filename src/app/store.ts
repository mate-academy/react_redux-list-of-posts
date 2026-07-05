// src/app/store.ts
/* eslint-disable no-param-reassign */
import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { getUsers } from '../api/users';
import { getUserPosts } from '../api/posts';
import * as commentsApi from '../api/comments';

import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

// ---------- users ----------
const initialUsers: User[] = [];

export const init = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_state, action) => action.payload);
  },
});

// ---------- author ----------
const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;

// ---------- posts ----------
export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialPosts: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchByUserId',
  (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

// ---------- selectedPost ----------
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_state, action: PayloadAction<Post | null>) =>
      action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;

// ---------- comments ----------
export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialComments: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchByPostId',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: CommentData & { postId: number }) => commentsApi.createComment(data),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialComments,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});

// ---------- store ----------
export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
