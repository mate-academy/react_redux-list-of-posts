/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from './commentsAPI';

export interface CommentsState {
  items: Comment[];
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getAllPostComments = createAsyncThunk(
  'postComments/fetch',
  async (postId: number) => {
    const loadedComments = await getPostComments(postId);

    return loadedComments;
  },
);

export const deletePostComment = createAsyncThunk(
  'deletePostComment/fetch',
  async (commentId: number) => deleteComment(commentId),
);

export const addComment = createAsyncThunk(
  'addPostComment/fetch',
  async (data: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(data);

    return createdComment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPostComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(getAllPostComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(getAllPostComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(deletePostComment.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const {
  remove,
} = commentsSlice.actions;
export default commentsSlice.reducer;
