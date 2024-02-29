/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { addCommentAsync } from './commentsSlice';
import { CommentData } from '../types/Comment';

export interface NewCommentErrors {
  name: boolean,
  email: boolean,
  body: boolean,
}

export interface NewCommentState {
  newComment: CommentData;
  loaded: boolean;
  hasError: NewCommentErrors,
}

const initialState: NewCommentState = {
  newComment: {
    name: '',
    email: '',
    body: '',
  },
  loaded: false,
  hasError: {
    name: false,
    email: false,
    body: false,
  },
};

export const newCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    setNewComment: (
      state: NewCommentState,
      action: PayloadAction<CommentData>,
    ) => {
      state.newComment = action.payload;
    },
    setNewCommentErrors: (
      state: NewCommentState,
      action: PayloadAction<NewCommentErrors>,
    ) => {
      state.hasError = action.payload;
    },
    setNewCommentName: (
      state: NewCommentState,
      action: PayloadAction<string>,
    ) => {
      state.newComment.name = action.payload;
    },
    setNewCommentEmail: (
      state: NewCommentState,
      action: PayloadAction<string>,
    ) => {
      state.newComment.email = action.payload;
    },
    setNewCommentBody: (
      state: NewCommentState,
      action: PayloadAction<string>,
    ) => {
      state.newComment.body = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addCommentAsync.fulfilled,
      (state: NewCommentState) => {
        state.loaded = false;
        state.newComment.body = '';
      });

    builder.addCase(addCommentAsync.rejected,
      (state: NewCommentState) => {
        state.loaded = false;
      });

    builder.addCase(addCommentAsync.pending,
      (state: NewCommentState) => {
        state.loaded = true;
      });
  },
});

export const {
  setNewComment,
  setNewCommentErrors,
  setNewCommentName,
  setNewCommentEmail,
  setNewCommentBody,
} = newCommentSlice.actions;
export default newCommentSlice.reducer;
