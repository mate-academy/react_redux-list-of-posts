/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../app/store';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export const fetchComments = createAsyncThunk<
  Comment[],
  number | undefined,
  ThunkConfig<boolean>
>('comments/fetchComments', async (postId, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;

  if (!postId) {
    return rejectWithValue(true);
  }

  try {
    const response = await getPostComments(postId);

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return rejectWithValue(true);
  }
});
