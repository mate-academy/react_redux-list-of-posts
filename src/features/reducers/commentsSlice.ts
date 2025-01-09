/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

type InitialStateType = {
  comments: Comment[];
  loaded: boolean;
  error: boolean;
};

const initialState: InitialStateType = {
  comments: [],
  loaded: true,
  error: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action) => {
      state.comments.push(action.payload);
    },
    remove: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    addError: state => {
      state.error = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.error = true;
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;

export const { add, remove, addError } = commentsSlice.actions;
