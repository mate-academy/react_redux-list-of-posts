import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type InitialState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const load = createAsyncThunk('comments/fetch', (id: number) => {
  return getPostComments(id);
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(load.pending, (state) => {
      state.loaded = true;
    });
    builder.addCase(load.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = false;
    });
    builder.addCase(load.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { add, remove } = commentsSlice.actions;
