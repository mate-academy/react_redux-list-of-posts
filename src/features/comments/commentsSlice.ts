/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

interface CommentsState {
  comments: Comment[],
  loading: boolean,
  error: boolean,
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return commentsApi.getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    take: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    clear: (state) => {
      state.comments = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default commentsSlice.reducer;
export const { add, take, clear, setError } = commentsSlice.actions;
