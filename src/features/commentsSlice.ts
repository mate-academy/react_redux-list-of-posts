import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

export const create = createAsyncThunk(
  'comment/create',
  async (comment: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(comment);

    return createdComment;
  },
);

export const fetchPostCommnets = createAsyncThunk(
  'comments/fetch',
  async (id: number) => {
    const comments = await getPostComments(id);

    return comments;
  },
);

export const deletePostCommnets = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    const comments = await deleteComment(id);

    return comments;
  },
);

export type CommentsState = {
  comments: Comment[];
  loading: boolean;
  isCreateCommentLoading: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  isCreateCommentLoading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComment(state, action: PayloadAction<[]>) {
      const currentState = state;

      currentState.comments = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deletePostCommnets.pending, (state, action) => {
        const currentState = state;

        currentState.comments = state.comments.filter(
          item => item.id !== action.payload,
        );
      })
      .addCase(fetchPostCommnets.pending, state => {
        const currentState = state;

        currentState.loading = true;
      })
      .addCase(fetchPostCommnets.fulfilled, (state, action) => {
        const currentState = state;

        currentState.loading = false;
        currentState.comments = action.payload;
      })
      .addCase(fetchPostCommnets.rejected, state => {
        const currentState = state;

        currentState.loading = false;
        currentState.error = true;
      })
      .addCase(create.pending, state => {
        const currentState = state;

        currentState.isCreateCommentLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        const currentState = state;

        currentState.isCreateCommentLoading = false;
        currentState.comments.push(action.payload);
      })
      .addCase(create.rejected, state => {
        const currentState = state;

        currentState.isCreateCommentLoading = false;
        currentState.error = true;
      });
    }
});

export const selectCommentState = (state: RootState) => state.comments;

export const { clearComment } = commentsSlice.actions;

export default commentsSlice.reducer;
