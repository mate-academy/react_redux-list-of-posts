/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { ThunkConfig } from '../../app/store';
import { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk<
  Post[],
  number | undefined,
  ThunkConfig<boolean>
>('posts/fetchPosts', async (userId, ThunkApi) => {
  const { rejectWithValue } = ThunkApi;

  if (!userId) {
    return rejectWithValue(true);
  }

  try {
    const response = await getUserPosts(userId);

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return rejectWithValue(true);
  }
});
