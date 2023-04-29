import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/fetchClient';
import { Comment, CommentData } from '../../types/Comment';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getComments: build.query<Comment[], number>({
      query: (id: number) => `/comments?postId=${id}`,
      providesTags: (result) => (result
        ? [
          ...result.map(() => ({ type: 'Comments' as const })),
          { type: 'Comments', id: 'LIST' },
        ]
        : [{ type: 'Comments', id: 'LIST' }]),
    }),
    addComment: build.mutation<Comment, CommentData>({
      query: (body: CommentData) => ({
        url: 'comments',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
    clearComment: build.mutation<Comment, number>({
      query: (id: number) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useClearCommentMutation,
} = commentsApi;
