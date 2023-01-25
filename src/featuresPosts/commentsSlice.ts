/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface PostsState {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
  visible: boolean,
}

const initialState: PostsState = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
    deleteComment: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    setError: (state) => {
      state.hasError = true;
    },
    setVisible: (state) => {
      state.visible = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
      state.visible = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;

      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },

});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
