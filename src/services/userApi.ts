/* eslint-disable @typescript-eslint/indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';

type UsersResponse = User[];

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mate.academy/students-api/' }),
  tagTypes: ['User'],
  endpoints: build => ({
    getUsers: build.query<UsersResponse, number | void>({
      query: () => 'users',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUser: build.query<User, string>({
      query: id => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = usersApi;
