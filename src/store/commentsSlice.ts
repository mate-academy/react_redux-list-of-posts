/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { client } from '../utils/fetchClient';
import { PostComment, CommentData } from '../types/Comment';
import { CommentsState } from '../types/CommentsState';

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return client.get<PostComment[]>(`posts/${postId}/comments`);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData) => {
    return client.comments.add(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComments',
  async (id: number) => {
    await client.comments.delete(id);

    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<PostComment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<PostComment>) => {
          state.items = [action.payload, ...state.items];
        },
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(c => c.id !== action.payload);
        },
      );
  },
});

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
