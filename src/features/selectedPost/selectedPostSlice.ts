import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import * as commentsApi from '../../api/comments';

export interface SelectedPostState {
  value: Post | null;
  postComments: Comment[];
  postCommentsLoaded: boolean;
  hasError: boolean;
}

const initialState: SelectedPostState = {
  value: null,
  postComments: [],
  postCommentsLoaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk(
  'selectedPost/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addPostComment = createAsyncThunk(
  'selectedPost/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.value = action.payload;
    },
    clearSelectedPost: state => {
      state.value = null;
      state.postComments = [];
    },
    setError: state => {
      state.hasError = true;
    },
    deletePostComment: (state, action: PayloadAction<number>) => {
      state.postComments = state.postComments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPostComments.pending, state => {
      state.hasError = false;
      state.postCommentsLoaded = false;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.hasError = false;
      state.postCommentsLoaded = true;
      state.postComments = action.payload;
    });
    builder.addCase(fetchPostComments.rejected, state => {
      state.postCommentsLoaded = true;
      state.hasError = true;
      state.postComments = [];
    });
    builder.addCase(addPostComment.fulfilled, (state, action) => {
      state.postComments.push(action.payload);
    });
    builder.addCase(addPostComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export const {
  setSelectedPost,
  clearSelectedPost,
  setError,
  deletePostComment,
} = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
