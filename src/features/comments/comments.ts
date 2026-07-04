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

export const fetchUCommentsAsync = createAsyncThunk(
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
    addComments: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUCommentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchUCommentsAsync.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchUCommentsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { addComments, clearComments } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
