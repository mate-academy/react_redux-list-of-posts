import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/User';

const BASE_URL = 'https://mate.academy/students-api';

export const GET_USERS_ENDPOINT = '/users';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    getUsersFromServer: builder.query<User[], string>({
      query: (endPoint) => endPoint,
    }),

  }),
});

export const { useGetUsersFromServerQuery } = usersApi;
