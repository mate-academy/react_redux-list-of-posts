/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getCommentsAsync = createAsyncThunk('comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  });

export const addCommentAsync = createAsyncThunk('comment/add',
  (data: Comment) => {
    return createComment(data);
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (comment) => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsAsync.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(getCommentsAsync.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addCommentAsync.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
