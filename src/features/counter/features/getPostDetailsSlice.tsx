/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../../api/comments';
import { Comment } from '../../../types/Comment';

interface GetNewCommentFormInterface {
  newComments: Comment[];
  loaded: boolean;
  error: boolean;
}

const initialState: GetNewCommentFormInterface = {
  newComments: [],
  loaded: false,
  error: false,
};

export const getPostDetailsAsync = createAsyncThunk(
  'postDetails/getPostDetailsAsync',
  async (postId: number) => {
    const newComments = await getPostComments(postId);

    return newComments;
  },
);

export const addPostDetailsAsync = createAsyncThunk(
  'postDetails/addPostDetailsAsync',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const deletePostDetailsAsync = createAsyncThunk(
  'postDetails/deletePostDetailsAsync',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const getPostDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPostDetailsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getPostDetailsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.newComments = action.payload;
      })
      .addCase(getPostDetailsAsync.rejected, state => {
        state.error = true;
        state.loaded = true;
      })
      .addCase(addPostDetailsAsync.fulfilled, (state, action) => {
        state.newComments.push(action.payload);
      })
      .addCase(addPostDetailsAsync.rejected, state => {
        state.error = true;
      })
      .addCase(deletePostDetailsAsync.fulfilled, (state, action) => {
        state.newComments = state.newComments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default getPostDetailsSlice.reducer;
