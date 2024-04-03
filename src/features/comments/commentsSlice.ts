/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { createComment, getPostComments } from '../../api/comments';

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

type State = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: State = {
  comments: [],
  loading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCommentById(state, action: PayloadAction<number>) {
      state.comments = state.comments.filter(
        item => item.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostCommnets.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPostCommnets.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchPostCommnets.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(create.rejected, state => {
        state.error = true;
      });
  },
});

export const selectCommentState = (state: RootState) => state.comments;

export const { deleteCommentById } = commentsSlice.actions;
export default commentsSlice.reducer;
