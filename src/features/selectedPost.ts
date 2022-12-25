/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type PostComments = {
  selectedPost: Post | null,
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: PostComments = {
  selectedPost: null,
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    closeDetails: (state) => {
      state.selectedPost = null;
      state.comments = [];
    },
    openDetails: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default CommentsSlice.reducer;
export const { actions } = CommentsSlice;
