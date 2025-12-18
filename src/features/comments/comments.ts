/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import { createComment, deleteComment } from '../../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async postId => {
    const items = await getPostComments(postId);

    return items;
  },
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/create',
  async (comment, { rejectWithValue }) => {
    try {
      const response = await createComment(comment);

      return response;
    } catch (error) {
      return rejectWithValue('Failed to create comment');
    }
  },
);

export const removeComment = createAsyncThunk<number, number>(
  'comments/delete',
  async (commentId, { rejectWithValue }) => {
    try {
      await deleteComment(commentId);

      return commentId;
    } catch (error) {
      return rejectWithValue('Failed to delete comment');
    }
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addComment.pending, state => {
        state.hasError = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(removeComment.pending, state => {
        state.hasError = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.loaded = true;
      })
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;
export const { setComments } = commentsSlice.actions;
