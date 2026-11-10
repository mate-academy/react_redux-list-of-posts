import { createAsyncThunk } from '@reduxjs/toolkit';
import { createComment } from '../../../api/comments';
import { PostComment } from '../../../types/PostComment';

export const createPostComment = createAsyncThunk(
  'postComments/create',
  async (comment: Omit<PostComment, 'id'>) => {
    return createComment(comment);
  },
);
