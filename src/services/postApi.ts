/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../types/Post';

type PostsResponse = Post[];

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mate.academy/students-api/' }),
  tagTypes: ['Post'],
  endpoints: build => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'posts',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getUserPosts: build.query<PostsResponse, number | void>({
      query: userId => `/posts?userId=${userId}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const { useGetPostsQuery, useGetUserPostsQuery } = postsApi;
