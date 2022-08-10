import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';

export const clientAPI = createApi({
  reducerPath: 'clientAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mate.academy/students-api' }),
  tagTypes: ['Comments'],
  endpoints: (build) => ({
    fetchAllUsers: build.query<User[], unknown>({
      query: () => ({
        url: '/users',
      }),
    }),
    fetchAllPosts: build.query<Post[], unknown>({
      query: (userId) => ({
        url: '/posts',
        params: {
          userId,
        },
      }),
    }),
    fetchAllComments: build.query<Comment[], unknown>({
      query: (postId) => ({
        url: '/comments',
        params: {
          postId,
        },
      }),
      providesTags: () => ['Comments'],
    }),
    deleteComment: build.mutation<number, number>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
    addComment: build.mutation<Comment, Comment>({
      query: (post) => ({
        url: '/comments/',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});
