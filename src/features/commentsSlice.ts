import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { fetchComments, postComment, deleteComment } from '../utils/thunks';

type Comments = {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
};

const startState: Comments = {
  comments: [],
  isLoading: false,
  hasError: false,
};

const postCommentsSlice = createSlice({
  name: 'comments',
  initialState: startState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
        hasError: false,
      };
    });
    builder.addCase(fetchComments.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
    builder.addCase(postComment.pending, (state) => {
      return {
        ...state,
        isSubmititng: true,
        hasError: false,
      };
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      return {
        ...state,
        isSubmititng: false,
        comments: [...state.comments, action.payload],
        hasError: false,
      };
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
        hasError: false,
      };
    });
  },
});

export default postCommentsSlice.reducer;
export const { removeComment } = postCommentsSlice.actions;
