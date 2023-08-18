/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { createComment, getPostComments } from '../../api/comments';

export const initComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Comment) => {
    return createComment(comment);
  },
);

type CommentsState = {
  items: Comment[];
  loading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (comment) => comment.id !== action.payload,
      );
    },
    discard: (state) => {
      state.items = [];
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initComments.pending, (state) => {
        state.loading = ((state.items.length > 0));
        state.loading = true;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(initComments.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const {
  set,
  add,
  remove,
  discard,
  setError,
} = commentsSlice.actions;
export default commentsSlice.reducer;
