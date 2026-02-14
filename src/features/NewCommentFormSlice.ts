/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';
export const addComment = createAsyncThunk(
  'comments/post',
  (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

type Inputs = {
  name: string;
  email: string;
  body: string;
};

type Errors = {
  name: boolean;
  email: boolean;
  body: boolean;
};

type FormState = {
  inputs: Inputs;

  errors: Errors;
  submitting: boolean;
  submitError: boolean;
};

const initialState: FormState = {
  inputs: {
    name: '',
    email: '',
    body: '',
  },

  errors: {
    name: false,
    email: false,
    body: false,
  },

  submitting: false,
  submitError: false,
};

export const { reducer, actions } = createSlice({
  name: 'NewCommentForm',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.errors = {
        name: !action.payload.name,
        email: !action.payload.email,
        body: !action.payload.body,
      };
    },

    setInputs: (state, action) => {
      state.inputs = { ...state.inputs, ...action.payload };
    },
    clearInputs: state => {
      state.inputs = {
        name: '',
        email: '',
        body: '',
      };
    },

    clearErrors: state => {
      state.errors = {
        name: false,
        email: false,
        body: false,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(addComment.pending, state => {
      state.submitting = true;
      state.submitError = false;
    });
    builder.addCase(addComment.rejected, state => {
      state.submitError = true;
      state.submitting = false;
    });
    builder.addCase(addComment.fulfilled, state => {
      state.submitting = false;
      state.inputs.body = '';
    });
  },
});
