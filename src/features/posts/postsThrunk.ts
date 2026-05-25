import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type AxiosLike<T> = { data: T };

const isAxiosLike = <T>(resp: unknown): resp is AxiosLike<T> => {
  return (
    typeof resp === 'object' &&
    resp !== null &&
    'data' in resp &&
    (resp as AxiosLike<T>).data !== undefined
  );
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    if (isAxiosLike<Post[]>(posts)) {
      return posts.data ?? [];
    }

    return Array.isArray(posts) ? posts : [];
  },
);
