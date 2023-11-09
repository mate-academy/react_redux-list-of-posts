/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { getPostComments } from '../../api/comments';

type PostState = {
  selectedPost: Post | null;
  selectedPostComments: Comment[];
  isLoading: boolean;
  error: string | null;
};

const initialState: PostState = {
  selectedPost: null,
  selectedPostComments: [],
  isLoading: false,
  error: null,
};

export const loadComents = createAsyncThunk(
  'post/fetchPostComments',
  async (postId: number) => {
    const promise = await getPostComments(postId);

    return promise;
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.selectedPostComments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedPostComments: state.selectedPostComments.filter(
          ({ id }) => id !== action.payload,
        ),
      };
    },
    setError: (state) => {
      state.error = 'Something went wrong';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComents.pending, (state) => {
      state.selectedPostComments = [];
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(loadComents.fulfilled, (state, action) => {
      state.selectedPostComments = action.payload;
      state.isLoading = false;
    });

    builder.addCase(loadComents.rejected, (state) => {
      state.error = 'Something went wrong';
      state.isLoading = false;
    });
  },
});

export const {
  setPost, addComment, deleteComment, setError,
}
  = postSlice.actions;

export default postSlice.reducer;
