/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

export interface CommentState {
  comments: Comment[],
  isCommentsVisible: boolean,
  commentUserEmail: string,
  commentUserName: string,
  commentBody: string,
  hasEmailError: boolean,
  hasNameError: boolean,
  hasBodyError: boolean,
  errorMessage: string,
}

const initialState: CommentState = {
  comments: [],
  isCommentsVisible: true,
  commentUserEmail: '',
  commentUserName: '',
  commentBody: '',
  hasEmailError: false,
  hasNameError: false,
  hasBodyError: false,
  errorMessage: '',
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    commentsLoad(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    hideComments(state, action: PayloadAction<boolean>) {
      state.isCommentsVisible = action.payload;
    },
    deleteComment(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    isEmailError(state) {
      state.hasEmailError = true;
    },
    isNameError(state) {
      state.hasNameError = true;
    },
    isBodyError(state) {
      state.hasBodyError = true;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.commentUserEmail = action.payload;
      state.hasBodyError = false;
      state.hasEmailError = false;
      state.hasNameError = false;
      state.errorMessage = '';
    },
    setUserName(state, action: PayloadAction<string>) {
      state.commentUserName = action.payload;
      state.hasBodyError = false;
      state.hasEmailError = false;
      state.hasNameError = false;
      state.errorMessage = '';
    },
    setBody(state, action: PayloadAction<string>) {
      state.commentBody = action.payload;
      state.hasBodyError = false;
      state.hasEmailError = false;
      state.hasNameError = false;
      state.errorMessage = '';
    },
    createComment(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
      state.hasBodyError = false;
      state.hasEmailError = false;
      state.hasNameError = false;
      state.errorMessage = '';
      state.commentBody = '';
      state.commentUserEmail = '';
      state.commentUserName = '';
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export default commentSlice.reducer;
