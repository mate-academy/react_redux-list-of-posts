import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINTS } from '../api/constant';
import { Post } from '../types/Post';

export const postApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPostsByUserId: builder.query<Post[], number>({
      query: ENDPOINTS.postsByUserId,
    }),
  }),
});

export const { useGetPostsByUserIdQuery } = postApi;
