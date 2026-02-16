/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset: state => {
      state.items = [];
      state.hasError = '';
      state.loaded = false;
    },
    deleteComment: (state, { payload }: PayloadAction<number>) => {
      state.items = state.items.filter(c => c.id !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.loaded = true;
      state.hasError = '';
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(init.rejected, state => {
      state.hasError = 'Error';
      state.loaded = false;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
    });
  },
});

export const { actions } = commentsSlice;
