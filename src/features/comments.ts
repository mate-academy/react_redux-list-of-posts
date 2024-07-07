import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const createNewComment = createAsyncThunk(
  'comments/createNewComment',
  async (data: Omit<Comment, 'id'>) => {
    const comments = await createComment(data);

    return comments;
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

export type CommentsState = {
  comments: Comment[];
  loading: string;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: '',
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loading = 'loading';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = '';
      })
      .addCase(loadComments.rejected, state => {
        state.loading = '';
        state.error = 'Error!';
      });

    builder
      .addCase(createNewComment.pending, state => {
        state.loading = 'add';
      })
      .addCase(createNewComment.fulfilled, (state, action) => {
        state.loading = '';
        state.comments.push(action.payload);
      })
      .addCase(createNewComment.rejected, state => {
        state.loading = '';
        state.error = 'Error!';
      });

    builder
      .addCase(deleteCommentFromServer.pending, state => {
        state.loading = 'delete';
      })
      .addCase(deleteCommentFromServer.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => {
          state.loading = '';
          return comment.id !== action.payload;
        });
      })
      .addCase(deleteCommentFromServer.rejected, state => {
        state.loading = '';
        state.error = 'Error!';
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
