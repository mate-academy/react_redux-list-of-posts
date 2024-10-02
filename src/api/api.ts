import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';
import { Post } from '../types/Post';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate.academy/students-api',
    timeout: 300,
  }),
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
    postComments: build.query<Comment, number>({
      query(postId) {
        return {
          url: 'comments',
          params: {
            postId: `${postId}`,
          },
        };
      },
    }),
    createComment: build.mutation<Comment, Omit<Comment, 'id'>>({
      query({ data }) {
        return {
          url: 'comments',
          method: 'POST',
          data,
        };
      },
    }),
    deleteComment: build.mutation<Comment, number>({
      query(commentId) {
        return {
          url: `comments/${commentId}`,
          method: 'DELETE',
        };
      },
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
