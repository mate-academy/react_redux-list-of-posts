/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';

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

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (newComment: {
    postId: number;
    name: string;
    email: string;
    body: string;
  }) => {
    const data = await client.post<Comment>('/comments', newComment);

    return data;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await client.delete(`/comments/${commentId}`);

    return commentId;
  },
);

export const fetchCommentsAsync = createAsyncThunk(
  'comments/fetchCount',
  async (postId: number) => {
    const data = await client.get<Comment[]>(`/comments?postId=${postId}`);

    return data;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComment: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCommentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchCommentsAsync.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(
        addCommentAsync.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(
        deleteCommentAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
        },
      )
      .addCase(fetchCommentsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { clearComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
