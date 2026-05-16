import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { createComment, getPostComments } from '../../api/comments';

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
  async (commentData: Omit<Comment, 'id'>) => {
    return createComment(commentData);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/fetch',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/fetch',
  async () => {
    return createComment(commentData);
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
  },
});

export default commentSlice.reducer;
