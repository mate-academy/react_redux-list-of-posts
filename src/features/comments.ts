import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

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

export const init = createAsyncThunk('comments/fetch', (postId: number) =>
  commentsApi.getPostComments(postId),
);

export const create = createAsyncThunk(
  'comments/create',
  (commentData: CommentData & { postId: number }) =>
    commentsApi.createComment(commentData),
);

export const remove = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId).then(() => commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(create.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(create.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });

    builder.addCase(remove.rejected, state => {
      state.hasError = true;
    });
  },
});

export const { clear } = commentsSlice.actions;
export default commentsSlice.reducer;
