import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';

export enum ActionTypes {
  LOAD = 'comments/load',
}

const loadPostComments = createAsyncThunk(
  ActionTypes.LOAD,
  async (postId: number) => {
    const posts = await getPostComments(postId);

    return posts;
  },
);

export { loadPostComments };
