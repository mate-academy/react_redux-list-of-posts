import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export enum TAGS {
  users = 'Users',
  posts = 'Posts',
  comments = 'Comments',
}

export type DeleteCommentResponse = {
  success: boolean;
  id: number;
};

export type DeleteCommentParams = {
  commentId: number;
  postId: number;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mate.academy/students-api',
  }),
  tagTypes: Object.values(TAGS),
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: [TAGS.users],
    }),

    getUserPosts: builder.query<Post[], number>({
      query: userId => `/posts?userId=${userId}`,
      providesTags: (_result, _error, postId) => [
        { type: TAGS.posts, id: postId },
      ],
    }),

    getPostComments: builder.query<Comment[], number>({
      query: postId => `/comments?postId=${postId}`,
      providesTags: (_result, _error, postId) => [
        { type: TAGS.comments, id: postId },
      ],
    }),

    createComments: builder.mutation<Comment, Omit<Comment, 'id'>>({
      query: data => ({
        url: '/comments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: TAGS.comments, id: postId },
      ],
    }),

    deleteComment: builder.mutation<DeleteCommentResponse, DeleteCommentParams>(
      {
        query: ({ commentId }) => ({
          url: `/comments/${commentId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_result, _error, { postId }) => [
          { type: TAGS.comments, id: postId },
        ],
      },
    ),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserPostsQuery,
  useGetPostCommentsQuery,
  useCreateCommentsMutation,
  useDeleteCommentMutation,
} = api;
