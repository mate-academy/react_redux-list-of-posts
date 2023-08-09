/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

type Comments = {
  comments: Comment[],
  loading: boolean,
  error: boolean,
};

const initialState: Comments = {
  comments: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const commentsSlice = createSlice({
  name: 'commnets',
  initialState,
  reducers: {
    add: (state: Comments, actions: PayloadAction<Comment[]>) => {
      state.comments = actions.payload;
    },
    take: (state: Comments, actions: PayloadAction<Comment>) => {
      state.comments = state.comments
        .filter((comments: Comment) => comments.body !== actions.payload.body);
    },
    clear: (state: Comments) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: Comments) => {
      state.loading = true;
    });

    builder.addCase(init.rejected, (state: Comments) => {
      state.error = false;
      state.loading = false;
    });

    builder.addCase(init.fulfilled,
      (state: Comments, actions: PayloadAction<Comment[]>) => {
        state.comments = actions.payload;
        state.loading = false;
      });
  },
});

export const { add, take, clear } = commentsSlice.actions;
export default commentsSlice.reducer;
