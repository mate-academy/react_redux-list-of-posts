import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(initComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
