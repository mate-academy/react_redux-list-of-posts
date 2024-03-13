import { createAsyncThunk } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

export const addPostComment = createAsyncThunk(
  'selectedPost/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);
