/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const init = createAsyncThunk('comments/fetch', (selectedPostId: number) => {
  return getPostComments(selectedPostId);
});

const initialState: CommentsState = {
  loaded: true,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { actions } = commentsSlice;
export const commentsThunks = { init };
export default commentsSlice.reducer;
