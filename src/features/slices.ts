/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getUsers } from '../api/users';
import * as postsApi from '../api/p_api';
import * as commentsApi from '../api/c_api';

// Users Slice
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

// Author Slice
const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

// Posts Slice
export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return postsApi.getUserPosts(userId);
  },
);

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialPostsState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
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
        state.loaded = true;
        state.items = action.payload;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

// Selected Post Slice
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

// Comments Slice
export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (commentData: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(commentData);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialCommentsState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialCommentsState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.hasError = false;
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

export const { setAuthor } = authorSlice.actions;
export const { clearPosts } = postsSlice.actions;
export const { setSelectedPost } = selectedPostSlice.actions;
export const { clearComments } = commentsSlice.actions;

export const usersReducer = usersSlice.reducer;
export const authorReducer = authorSlice.reducer;
export const postsReducer = postsSlice.reducer;
export const selectedPostReducer = selectedPostSlice.reducer;
export const commentsReducer = commentsSlice.reducer;
