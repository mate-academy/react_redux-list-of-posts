import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';

const USERS_URL = 'https://mate.academy/students-api';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: USERS_URL }),
  endpoints: (builder) => ({

    getUsersFromServer: builder.query<User[], string>({
      query: (endPoint) => endPoint,
    }),

  }),
});

export const { useGetUsersFromServerQuery } = usersApi;
