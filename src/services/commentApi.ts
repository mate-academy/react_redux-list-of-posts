/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '../types/Comment';

type CommentsResponse = Comment[];

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mate.academy/students-api/' }),
  tagTypes: ['Comment'],
  endpoints: build => ({
    getComments: build.query<CommentsResponse, number | void>({
      query: postId => `comments?postId=${postId}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'Comment', id: 'LIST' },
            ]
          : [{ type: 'Comment', id: 'LIST' }],
    }),
    addComment: build.mutation<Comment, Partial<Comment>>({
      query: body => ({
        url: `comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),
    deleteComment: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `comments/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'Comment', id }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
