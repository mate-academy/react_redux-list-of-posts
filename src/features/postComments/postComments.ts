/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type TypeState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: TypeState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const init = createAsyncThunk('comments/fetchByUser', (id: number) => {
  return getPostComments(id);
});

export const addNewComment = createAsyncThunk(
  'comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const deleteNewComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items = [...state.items, action.payload];
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = 'Error';
    });
    builder.addCase(
      addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );
    builder.addCase(
      deleteNewComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      },
    );
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
