/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Comments = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: Comments = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch',
  (post: Post) => {
    return getPostComments(post.id);
  });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    take: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const { add, take, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
