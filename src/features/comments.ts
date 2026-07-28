/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (item: Omit<Comment, 'id'>) => {
    const value = await createComment(item);

    return value;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
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
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = state.items.filter(
          (item: Comment) => item.id !== action.payload,
        );
      })
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
      })
      .addMatcher(
        isRejected(fetchComments, addComment, removeComment),
        state => {
          state.loaded = true;
          state.hasError = true;
        },
      );
  },
});

export const selectCommentsState = (state: RootState) => state.comments;

export default commentsSlice.reducer;
