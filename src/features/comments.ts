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
        /* eslint-disable-next-line no-param-reassign */
        state.loading = 'loading';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        /* eslint-disable-next-line no-param-reassign */
        state.comments = action.payload;
        /* eslint-disable-next-line no-param-reassign */
        state.loading = '';
      })
      .addCase(loadComments.rejected, state => {
        /* eslint-disable-next-line no-param-reassign */
        state.loading = '';
        /* eslint-disable-next-line no-param-reassign */
        state.error = 'Error!';
      });

    builder
      .addCase(createNewComment.pending, state => {
        /* eslint-disable-next-line no-param-reassign */
        state.loading = 'add';
      })
      .addCase(createNewComment.fulfilled, (state, action) => {
        /* eslint-disable-next-line no-param-reassign */
        state.loading = '';
        /* eslint-disable-next-line no-param-reassign */
        state.comments.push(action.payload);
      })
      .addCase(createNewComment.rejected, state => {
        /* eslint-disable-next-line no-param-reassign */
        state.loading = '';
        /* eslint-disable-next-line no-param-reassign */
        state.error = 'Error!';
      });

    builder
      .addCase(deleteCommentFromServer.pending, state => {
        /* eslint-disable-next-line no-param-reassign */
        state.loading = 'delete';
      })
      .addCase(deleteCommentFromServer.fulfilled, (state, action) => {
        /* eslint-disable-next-line no-param-reassign */
        state.comments = state.comments.filter(comment => {
          /* eslint-disable-next-line no-param-reassign */
          state.loading = '';

          return comment.id !== action.payload;
        });
      })
      .addCase(deleteCommentFromServer.rejected, state => {
        /* eslint-disable-next-line no-param-reassign */
        state.loading = '';
        /* eslint-disable-next-line no-param-reassign */
        state.error = 'Error!';
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
