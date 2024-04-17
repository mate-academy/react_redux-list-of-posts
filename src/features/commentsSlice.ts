/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(userComments.pending, state => {
      state.loaded = true;
    });
    builder.addCase(userComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(userComments.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { setComments } = commentsSlice.actions;

export const getUserComments = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});
