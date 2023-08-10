/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Post } from '../types/Post';
import { SelectedPost } from '../types/SelectedPost';

const initialState: SelectedPost = {
  post: null,
  loaded: true,
  hasError: false,
  submitting: false,
  submittingError: false,
  comments: [],
};

export const init = createAsyncThunk('fetch/coments', (id: number) => {
  return getPostComments(id);
});

export const addComment = createAsyncThunk(
  'fetch/addComents',
  (data: Comment) => {
    return createComment(data);
  },
);

const postSlice = createSlice({
  name: 'coments',
  initialState,
  reducers: {
    addPost: (state, actions:PayloadAction<Post>) => {
      state.post = actions.payload;
    },

    removePost: (state) => {
      state.post = null;
    },

    removeComment: (state, actions:PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== actions.payload);
      deleteComment(actions.payload);
    },
  },

  // download comments
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
        state.submittingError = false;
      });

    builder
      .addCase(init.fulfilled, (state, actions: PayloadAction<Comment[]>) => {
        state.comments = actions.payload;
        state.loaded = true;
      });

    builder
      .addCase(init.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });

    // add new comment
    builder
      .addCase(addComment.pending, (state) => {
        state.submitting = true;
      });

    builder
      .addCase(addComment.fulfilled, (state, actions) => {
        state.comments.push(actions.payload);
        state.submitting = false;
      });

    builder
      .addCase(addComment.rejected, (state) => {
        state.submitting = false;
        state.submittingError = true;
      });
  },
});

export const {
  addPost,
  removePost,
  removeComment,
} = postSlice.actions;
export default postSlice.reducer;
