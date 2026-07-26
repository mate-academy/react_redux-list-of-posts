import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

const initialState = {
  loaded: false,
  items: [] as Comment[],
  hasError: false,
};

export const load = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const add = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const remove = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear(state) {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      // load
      .addCase(load.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(load.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(load.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      // add
      .addCase(add.pending, state => {
        state.hasError = false;
      })
      .addCase(add.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      })
      .addCase(add.rejected, state => {
        state.hasError = true;
      })
      // remove
      .addCase(remove.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(remove.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { clear } = commentsSlice.actions;
