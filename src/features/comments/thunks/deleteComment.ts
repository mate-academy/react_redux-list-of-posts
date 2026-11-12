import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteComment } from '../../../api/comments';

export const deletePostComment = createAsyncThunk(
  'postComments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);
