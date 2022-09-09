import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../../types/Post';

const BASE_URL = 'https://mate.academy/students-api';
const END_POINT = '/posts/';

export const postByIdApi = createApi({
  reducerPath: 'postById',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getPostById: builder.query<Post, number | null>({
      query: (userId) => `${END_POINT}${userId}`,
    }),
  }),
});

export const { useGetPostByIdQuery } = postByIdApi;
