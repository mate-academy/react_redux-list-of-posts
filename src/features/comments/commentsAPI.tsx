import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';

export const setComments = createAsyncThunk('/comments/fetchComments',
  async (id: number) => {
    const comments = await getPostComments(id);

    return comments;
  });
