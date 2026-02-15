/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const removeComment = createAsyncThunk(
  'posts/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export const selectComments = (state: RootState) => state.comments.items;

export default commentsSlice.reducer;
