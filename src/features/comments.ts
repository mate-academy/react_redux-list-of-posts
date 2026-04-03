import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type InitialState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: InitialState = {
  items: [],
  loaded: true,
  hasError: '',
};

export const init = createAsyncThunk('comments/fetch', (postid: number) => {
  return getPostComments(postid);
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });
    builder.addCase(init.rejected, state => {
      state.hasError = 'Error';
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
