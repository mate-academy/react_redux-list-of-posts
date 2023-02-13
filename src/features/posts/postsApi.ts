import { Post } from '../../types/Post';
import { emptyApi } from '../emptyApi';

export const postsApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<Post[], number>({
      query: (userId) => `/posts?userId=${userId}`,
    }),
  }),
});

export const { useGetUserPostsQuery } = postsApi;
