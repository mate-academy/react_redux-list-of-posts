import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment as apiCreateComment,
  deleteComment as apiDeleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const loadPostComments = createAsyncThunk<Comment[], number>(
  'comments/load',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk<
Comment,
CommentData & { postId: number }
>('comments/add', async commentData => {
  const newComment = await apiCreateComment(commentData);

  return newComment;
});

export const deleteComment = createAsyncThunk<number, number>(
  'comments/delete',
  async commentId => {
    await apiDeleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadPostComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
