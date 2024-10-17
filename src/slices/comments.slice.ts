/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type Comments = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: Comments = {
  loaded: true,
  hasError: false,
  items: [],
};

export const fetchPostComments = createAsyncThunk<Comment[], number>(
  'comments/fetchPostComments',
  async (postId: number) => {
    const result = await getPostComments(postId);

    return result;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.items = [...state.items, action.payload];
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(el => el.id !== action.payload);
    },
    takeError: state => {
      state.hasError = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPostComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(
      fetchPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );
    builder.addCase(fetchPostComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { addNewComment, takeError, deleteComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
