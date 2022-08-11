import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export interface CommentsState {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
  visibleComments: boolean,
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  visibleComments: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetchComments',
  async (id:number) => getPostComments(id),
);

export const addComment = createAsyncThunk(
  'comments/postComment',
  async ({
    body, name, email, postId,
  }: Omit<Comment, 'id'>) => {
    const newComment = {
      body, name, email, postId,
    };

    await commentsApi.createComment(newComment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id: number) => {
    await commentsApi.deleteComment(id);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisibleComments: (state) => {
      state.visibleComments = !state.visibleComments;
    },
    addCommentLocal: (state, action) => {
      state.comments.push({ ...action.payload, id: Math.random() });
    },
    deleteCommentLocal: (state, action) => {
      state.comments = state
        .comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.visibleComments = false;
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const {
  setVisibleComments,
  addCommentLocal,
  deleteCommentLocal,
} = commentsSlice.actions;
export default commentsSlice.reducer;
