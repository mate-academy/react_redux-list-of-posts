import { Dispatch } from '@reduxjs/toolkit';
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailed,
} from './postsSlice';
import { getUserPosts } from '../../api/posts';

export const fetchPosts = (id: number | null) => async (dispatch: Dispatch) => {
  try {
    if (id) {
      dispatch(fetchPostsStart());
      const response = await getUserPosts(id);

      dispatch(fetchPostsSuccess(response));
    } else {
      dispatch(fetchPostsSuccess([]));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(fetchPostsFailed(error.message));
    } else {
      dispatch(fetchPostsFailed('Unable to fetch Posts'));
    }
  }
};
