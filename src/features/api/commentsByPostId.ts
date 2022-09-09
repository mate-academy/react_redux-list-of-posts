import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '../../types/Comment';

const BASE_URL = 'https://mate.academy/students-api';

enum ENDPOINT {
  getComments = '/comments?postId=',
  deleteComment = '/comments/',
  addComment = '/comments/',
}

export const commentsByPostIdApi = createApi({
  reducerPath: 'commentsByPostId',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({

    getCommentsByPostId: builder.query<Comment[], number | null>({
      query: (postId) => `${ENDPOINT.getComments}${postId}`,
      providesTags: ['Comment'],
    }),

    deleteCommentById: builder.mutation<void, number>({
      query: (commentId) => ({
        url: `${ENDPOINT.deleteComment}${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),

    addCommentByPostId: builder.mutation<Comment, Omit<Comment, 'id'>>({
      query: (commentBody) => ({
        url: `${ENDPOINT.addComment}`,
        method: 'POST',
        body: commentBody,
      }),
      invalidatesTags: ['Comment'],
    }),

  }),
});

export const {
  useGetCommentsByPostIdQuery,
  useDeleteCommentByIdMutation,
  useAddCommentByPostIdMutation,
} = commentsByPostIdApi;
