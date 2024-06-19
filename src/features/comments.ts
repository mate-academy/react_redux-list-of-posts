/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type State = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.items.push(action.payload);
    },

    removeComments: (state, action) => {
      state.items = action.payload;
    },

    setError: (state, action) => {
      state.hasError = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setComments, removeComments, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
