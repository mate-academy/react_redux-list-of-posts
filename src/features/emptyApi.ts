import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptyApi = createApi({
  reducerPath: 'emptyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mate.academy/students-api' }),
  endpoints: () => ({}),
});
