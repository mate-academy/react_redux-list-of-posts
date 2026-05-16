import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

interface CommentState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/fetch',
  async (commentData: Comment) => {
    return createComment(commentData);
  },
);

export const deleteComments = createAsyncThunk(
  'comments/fetch',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(deleteComments.pending, (state, action) => {
     state.items.filter(item => item.id === )
    });
  },
});

export default commentSlice.reducer;
