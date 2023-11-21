import { createSlice } from '@reduxjs/toolkit';
import {
  postComment,
  deleteComment,
  loadComments,
} from '../thunks/commentsThunk';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

const postCommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter((comment) => comment.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadComments.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      },
    )
      .addCase(loadComments.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          comments: action.payload,
        };
      })
      .addCase(loadComments.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      })
      .addCase(postComment.pending, (state) => {
        return {
          ...state,
          isSubmitting: true,
        };
      })
      .addCase(postComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: [...state.comments, action.payload],
          isSubmitting: false,
        };
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: state.comments
            .filter((comment) => comment.id !== action.payload),
        };
      });
  },
});

export const { removeComment } = postCommentsSlice.actions;
export default postCommentsSlice.reducer;
