/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate.academy/students-api',
  }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: build => ({
    users: build.query<User[], void>({
      query: () => 'users',
    }),
    user: build.query<User, number>({
      query: userId => `users/${userId}`,
    }),
    userPosts: build.query<Post[], number>({
      query(userId) {
        return {
          url: 'posts',
          params: {
            userId: `${userId}`,
          },
        };
      },
    }),
    posts: build.query<Post[], void>({
      query: () => 'posts',
    }),
    postComments: build.query<Comment[], number>({
      query(postId) {
        return {
          url: 'comments',
          params: {
            postId: `${postId}`,
          },
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'Comment', id: 'LIST' },
            ]
          : [{ type: 'Comment', id: 'LIST' }],
    }),
    createComment: build.mutation<Comment, Omit<Comment, 'id'>>({
      query: body => ({ url: 'comments', method: 'POST', body }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),
    deleteComment: build.mutation<Comment, number>({
      query: commentId => ({ url: `comments/${commentId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, commentId) => [
        { type: 'Comment', id: commentId },
      ],
    }),
  }),
});

export default api;

export const {
  useUsersQuery,
  useUserQuery,
  useUserPostsQuery,
  usePostsQuery,
  usePostCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = api;
