/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export type InitialStateType = {
  status: 'idle' | 'loading' | 'failed',
  postComments: Comment[],
  selectedPost: Post | null,
};
const initialState: InitialStateType = {
  status: 'idle',
  postComments: [],
  selectedPost: null,
};

export const loadPostCommentsAsync = createAsyncThunk(
  'selectedPost/fetchPostComments',
  (userId:number) => {
    return getPostComments(userId);
  },
);

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    setEmptyPost: (state) => {
      state.selectedPost = null;
    },
    setPostComments: (state, action: PayloadAction<Comment[]>) => {
      state.postComments = action.payload;
    },
    setNewComment: (state, action: PayloadAction<Comment>) => {
      state.postComments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.postComments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadPostCommentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadPostCommentsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.postComments = action.payload;
      })
      .addCase(loadPostCommentsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  setSelectedPost,
  setEmptyPost, setPostComments, setNewComment, deleteComment,
} = selectedPostSlice.actions;
export const posts = (state: RootState) => state.posts.posts;
export const selectedPost = (state: RootState) => state.posts.selectedPost;

export default selectedPostSlice.reducer;
