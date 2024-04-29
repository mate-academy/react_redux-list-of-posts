/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
  submitting: boolean;
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
  submitting: false,
};

export const initComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

// the ability to return a comment in case of an error when deleting a comment on the server
export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, thunkAPI) => {
    const state = thunkAPI.getState() as { comments: CommentsState };

    const oldComments = [...state.comments.comments];

    thunkAPI.dispatch({
      type: 'comments/setComments',
      payload: oldComments.filter(comment => comment.id !== commentId),
    });

    try {
      await deleteComment(commentId);
    } catch (e) {
      thunkAPI.dispatch({
        type: 'comments/setComments',
        payload: oldComments,
      });
    }
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(initComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.pending, state => {
        state.submitting = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.submitting = false;
      })
      .addCase(addComment.rejected, state => {
        state.submitting = false;
      });
  },
});

export default commentsSlice.reducer;
