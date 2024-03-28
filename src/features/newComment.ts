/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentData, Comment } from '../types/Comment';
import { createComment } from '../api/comments';

type NewCommentErrors = {
  name: boolean;
  body: boolean;
  email: boolean;
};

type NewCommentState = {
  newCommentData: CommentData;
  visible: boolean;
  submitting: boolean;
  errors: NewCommentErrors;
};

const initialComment: CommentData = {
  name: '',
  body: '',
  email: '',
};

const initialCommentError: NewCommentErrors = {
  name: false,
  body: false,
  email: false,
};

const initialNewComment: NewCommentState = {
  newCommentData: initialComment,
  visible: false,
  submitting: false,
  errors: initialCommentError,
};

export const postComment = createAsyncThunk('newComment/post', (comment: Omit<Comment, 'id'>) => {
  return createComment(comment);
});

export const newCommentSlice = createSlice({
  name: 'newComment',
  initialState: initialNewComment,
  reducers: {
    set: (state, action: PayloadAction<CommentData>) => {
      const newComment = {
        name: action.payload.name,
        body: action.payload.body,
        email: action.payload.email,
      };

      return {
        ...state,
        newCommentData: newComment,
      };
    },
    setVisibility: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        visible: action.payload,
      };
    },
    clear: (state) => {
      return {
        ...state,
        newCommentData: initialComment,
        errors: initialCommentError,
      };
    },
    setErrors: (state, action: PayloadAction<NewCommentErrors>) => {
      return {
        ...state,
        errors: action.payload,
      };
    }
  },
  extraReducers: builder => {
    builder.addCase(postComment.pending, (state) => {
      return {
        ...state,
        submitting: true,
      };
    });
    builder.addCase(postComment.fulfilled, (state) => {
      return {
        ...state,
        newCommentData: initialComment,
        submitting: false,
      };
    });
    builder.addCase(postComment.rejected, (state) => {
      return {
        ...state,
        submitting: false,
      };
    });
  }
});

export const { set, setVisibility, clear, setErrors } = newCommentSlice.actions;

export default newCommentSlice.reducer;
