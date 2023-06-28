/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type InitialState = {
  loading: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: InitialState = {
  loading: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk('comments/fetch', (id: number) => {
  return getPostComments(id);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending,
      (state) => {
        state.loading = true;
      });

    builder.addCase(loadComments.fulfilled,
      (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });

    builder.addCase(loadComments.rejected,
      (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { add, remove, setError } = commentsSlice.actions;
