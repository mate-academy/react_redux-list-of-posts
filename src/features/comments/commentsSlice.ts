import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { loadPostComments } from './commentsAPI';

interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadCommentsThunk = createAsyncThunk(
  'comments/loadComments',
  loadPostComments
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    setComments(
      state: CommentsState,
      action: PayloadAction<{ items: Comment[] }>,
    ) {
      state.items = action.payload.items;
    },
    setLoaded(
      state: CommentsState,
      action: PayloadAction<{ loaded: boolean }>,
    ) {
      state.loaded = action.payload.loaded;
    },
    setHasError(
      state: CommentsState,
      action: PayloadAction<{ hasError: boolean }>,
    ) {
      state.hasError = action.payload.hasError;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsThunk.pending, (state: CommentsState) => {
        state.loaded = false;
      })
      .addCase(loadCommentsThunk.fulfilled, (state: CommentsState, action: PayloadAction<{items: Comment[]}>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadCommentsThunk.rejected, (state: CommentsState) => {
        state.hasError = true;
      })
  }
});

export const commentsReducer = commentsSlice.reducer;
export const { setComments, setLoaded, setHasError } = commentsSlice.actions;
