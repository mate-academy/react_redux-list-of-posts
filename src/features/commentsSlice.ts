/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  statusComments: 'idle' | 'loading' | 'failed';
}

const initialState: CommentsState = {
  comments: [],
  statusComments: 'loading',
};

export const loadComments = createAsyncThunk(
  'comments/fetch', (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
    },
    del: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        item => item.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.statusComments = 'loading';
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.statusComments = 'idle';
      state.comments = action.payload;
    });

    builder.addCase(loadComments.rejected, (state) => {
      state.statusComments = 'failed';
    });
  },
});

export const { add, del } = commentsSlice.actions;

export default commentsSlice.reducer;
