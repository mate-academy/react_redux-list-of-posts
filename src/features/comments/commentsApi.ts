import { Comment } from '../../types/Comment';
import { emptyApi } from '../emptyApi';

export const commentsApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query<Comment[], number>({
      query: (postId: number) => `/comments?postId=${postId}`,
    }),

    addComment: builder.mutation<Comment, Omit<Comment, 'id'>>({
      query: (data: Omit<Comment, 'id'>) => ({
        url: '/comments',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    deleteComment: builder.mutation<void, number>({
      query: (commentId: number) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
