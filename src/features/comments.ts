import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import { RootState } from '../app/store';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

/* eslint-disable no-param-reassign */
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        loadPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
          state.hasError = false;
        },
      )
      .addCase(loadPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { addComment, removeComment, clearComments, setError } =
  commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;
