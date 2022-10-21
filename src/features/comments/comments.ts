/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { NewComment } from '../../types/NewComment';

export interface InitialState {
  comments: Comment [] | null;
  isLoaded: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  comments: null,
  isLoaded: false,
  isError: false,
};

export const fetchComments = createAsyncThunk('comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  });

export const addNewComment = createAsyncThunk('comments/addNewComment',
  (comment: NewComment) => {
    return createComment(comment);
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      if (state.comments && state.comments.length > 0) {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoaded = false;
        state.comments = [];
        state.isError = false;
      })

      .addCase(fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoaded = true;
          state.comments = [...action.payload];
        })

      .addCase(fetchComments.rejected, (state) => {
        state.isLoaded = false;
        state.comments = [];
        state.isError = true;
      })

      .addCase(addNewComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.isLoaded = true;
          state.isError = false;
          if (state.comments) {
            state.comments = [...state.comments, action.payload];
          } else {
            state.comments = [action.payload];
          }
        })

      .addCase(addNewComment.rejected, (state) => {
        state.isLoaded = true;
        state.isError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { removeComment } = commentsSlice.actions;
