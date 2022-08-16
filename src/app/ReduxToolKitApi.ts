import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  tagTypes: ['Users', 'Posts', 'Comments'],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['Users'],
    }),

    getUserPosts: builder.query<Post[], number | null>({
      query: (userId) => `/posts?userId=${userId}`,
    }),

    getPostComments: builder.query<Comment[], number>({
      query: (postId) => `/comments?postId=${postId}`,
      providesTags: ['Comments'],
    }),

    addComment: builder.mutation<void, Partial<Comment>>({
      query(body) {
        return {
          url: '/comments',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Comments'],
    }),

    deleteComment: builder.mutation<Comment, number>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserPostsQuery,
  useGetPostCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = api;
