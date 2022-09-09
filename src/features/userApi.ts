import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ENDPOINTS } from '../api/constant';
import { User } from '../types/User';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], undefined>({
      query: () => ENDPOINTS.users,
    }),
    getUser: builder.query<User, number>({
      query: ENDPOINTS.user,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = userApi;
