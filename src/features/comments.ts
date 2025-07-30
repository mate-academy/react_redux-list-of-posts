import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const fetchAllComments = createAsyncThunk(
  'comments/commentsPosts',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'commnets/:id',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const createNewComment = createAsyncThunk(
  'comments/data',
  async ({ name, email, body, postId }: Comment) => {
    return createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    ADD_COMMENT: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllComments.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.loading = false;
      })

      .addCase(deleteCommentFromServer.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(deleteCommentFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteCommentFromServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })

      .addCase(createNewComment.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(createNewComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(createNewComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      });
  },
});

export default commentsSlice.reducer;
