import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  fetchComments,
  fetchCreateComments,
  fetchDeleteComments,
} from './commentAPI';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  LOADING_BTN: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  LOADING_BTN: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comment/fetchComments',
  async (userId: number) => {
    const response = await fetchComments(userId);

    return response;
  },
);

export const addComments = createAsyncThunk(
  'comment/addComment',
  async (data: CommentData) => {
    const response = await fetchCreateComments(data);

    return response;
  },
);

export const deleteComments = createAsyncThunk(
  'comment/deleteComment',
  async (commentId: number) => {
    await fetchDeleteComments(commentId);

    return commentId;
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
      })
      .addCase(initComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        // eslint-disable-next-line no-param-reassign
        state.LOADING_BTN = false;
      })
      .addCase(addComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.LOADING_BTN = true;
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentSlice.reducer;
