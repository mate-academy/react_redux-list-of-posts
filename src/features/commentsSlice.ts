import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../api/comments';
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

export const create = createAsyncThunk(
  'comment/create',
  async (comment: Comment) => {
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

export type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCommentById(state, action: PayloadAction<number>) {
      const currentState = state;

      currentState.comments = state.comments.filter(
        item => item.id !== action.payload,
      );
    },
    clearComment(state, action: PayloadAction<[]>) {
      const currentState = state;

      currentState.comments = action.payload;
    },
  },
  extraReducers: builder => {
    builder
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
      .addCase(create.fulfilled, (state, action) => {
        const currentState = state;

        currentState.comments.push(action.payload);
      })
      .addCase(create.rejected, state => {
        const currentState = state;

        currentState.error = true;
      });
  },
});

export const selectCommentState = (state: RootState) => state.comments;

export const { deleteCommentById, clearComment } = commentsSlice.actions;

export default commentsSlice.reducer;
