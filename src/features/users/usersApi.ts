import { User } from '../../types/User';
import { emptyApi } from '../emptyApi';

export const usersApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
