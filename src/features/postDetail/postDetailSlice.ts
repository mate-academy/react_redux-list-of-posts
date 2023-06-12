/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';
import { createComment, getPostComments, deleteComment } from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { Status } from '../../types/Status';

export type InitialStateType = {
  status: Status,
  postComments: Comment[],
  selectedPost: Post | null,
  commentToPost: CommentData | null,
};
const initialState: InitialStateType = {
  status: Status.idle,
  postComments: [],
  selectedPost: null,
  commentToPost: null,
};

export const loadPostCommentsAsync = createAsyncThunk(
  'selectedPost/fetchPostComment',
  (userId:number) => {
    return getPostComments(userId);
  },
);

export const postCommentAsync = createAsyncThunk(
  'selectedPost/postComments',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'selectedPost/deleteComment',
  (commentId: number) => {
    return deleteComment(commentId);
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
    clearPostComments: (state) => {
      state.postComments = [];
    },
    setNewComment: (state, action: PayloadAction<Comment>) => {
      state.postComments.push(action.payload);
    },
    deleteCommentById: (state, action: PayloadAction<number>) => {
      state.postComments = state.postComments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadPostCommentsAsync.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(loadPostCommentsAsync.fulfilled, (state, action) => {
        state.status = Status.idle;
        state.postComments = action.payload;
      })
      .addCase(loadPostCommentsAsync.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(postCommentAsync.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(postCommentAsync.fulfilled, (
        state, action: PayloadAction<Omit<Comment, 'id'>>,
      ) => {
        state.status = Status.idle;
        state.commentToPost = action.payload;
      })
      .addCase(postCommentAsync.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(deleteCommentAsync.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(deleteCommentAsync.fulfilled, (state) => {
        state.status = Status.idle;
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.status = Status.failed;
      });
  },
});

export const {
  setSelectedPost,
  setEmptyPost, setPostComments, setNewComment, deleteCommentById,
  clearPostComments,
} = selectedPostSlice.actions;

export const selectedPost = (state: RootState) => state.selectedPost.selectedPost;

export default selectedPostSlice.reducer;
