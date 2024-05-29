import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment, CommentData } from '../../types/Comment';

export const usersApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate.academy/students-api',
    // this would be needed if we would have authentication
    // prepareHeaders(headers) {
    //   headers.set('x-api-key', USER_API_KEY)

    //   return headers
    // },
  }),
  tagTypes: ['Comments'],
  endpoints(builder) {
    return {
      fetchUsers: builder.query<User[], number | void>({
        query() {
          return '/users';
        },
      }),
      fetchUser: builder.query<User[], number | void>({
        query(userId) {
          return `/users/${userId}`;
        },
      }),
      fetchUserPosts: builder.query<Post[], number | void>({
        query(userId) {
          return `/posts?userId=${userId}`;
        },
      }),
      fetchPostComments: builder.query<Comment[], number | void>({
        query(postId) {
          return `/comments?postId=${postId}`;
        },
      }),
      deleteComment: builder.mutation({
        query: commentId => ({
          url: `/comments/${commentId}`,
          method: 'DELETE',
        }),
      }),
      addComment: builder.mutation<Comment, CommentData>({
        query: body => ({
          url: `/comments`,
          method: 'POST',
          body,
        }),
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
  useFetchUserPostsQuery,
  useFetchUserQuery,
  useFetchPostCommentsQuery,
  useDeleteCommentMutation,
  useAddCommentMutation,
} = usersApiSlice;
