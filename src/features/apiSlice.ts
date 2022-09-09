import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINTS } from '../api/constant';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], undefined>({
      query: () => ENDPOINTS.users,
    }),
    getUser: builder.query<User, number>({
      query: ENDPOINTS.user,
    }),
    getPostsByUserId: builder.query<Post[], number>({
      query: ENDPOINTS.postsByUserId,
    }),
    getCommentsByPostId: builder.query<Comment[], number>({
      query: ENDPOINTS.commentsByPostId,
      providesTags: ['Comment'],
    }),
    addComment: builder.mutation<Comment, Omit<Comment, 'id'>>({
      query: (comment) => ({
        url: ENDPOINTS.comments,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation<Comment[], number>({
      query: (commentId) => ({
        url: ENDPOINTS.commentsById(commentId),
        method: 'DELETE',
        body: commentId,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetPostsByUserIdQuery,
  useGetCommentsByPostIdQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = apiSlice;
