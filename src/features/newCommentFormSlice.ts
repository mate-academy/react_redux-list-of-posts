/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type FieldErrors = {
  name: boolean;
  email: boolean;
  body: boolean;
};

type CreateNewCommentState = {
  comment: CommentData;
  fieldErrors: FieldErrors;
  submitting: boolean;
};

const initialState: CreateNewCommentState = {
  comment: {
    name: '',
    email: '',
    body: '',
  },
  fieldErrors: {
    name: false,
    email: false,
    body: false,
  },
  submitting: false,
};

export const commentCreate = createAsyncThunk(
  'comments/create',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const commentDelete = createAsyncThunk(
  'comment/delete',
  (commentId: number) => deleteComment(commentId),
);

export const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<Partial<CommentData>>) => {
      state.comment = { ...state.comment, ...action.payload };
    },
    setErrors: (state, action: PayloadAction<Partial<FieldErrors>>) => {
      state.fieldErrors = { ...state.fieldErrors, ...action.payload };
    },
    clearForm: state => {
      state.comment.name = '';
      state.comment.email = '';
      state.comment.body = '';
      state.fieldErrors.name = false;
      state.fieldErrors.email = false;
      state.fieldErrors.body = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(commentCreate.pending, state => {
      state.submitting = true;
    });
    builder.addCase(commentCreate.rejected, state => {
      state.submitting = false;
    });
    builder.addCase(commentCreate.fulfilled, state => {
      state.submitting = false;
    });
  },
});

export const { setComment, setErrors, clearForm } = newCommentFormSlice.actions;
export default newCommentFormSlice.reducer;
