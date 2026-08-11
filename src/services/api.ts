import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({
    // Define your endpoints here, for example:
    // getExample: builder.query<any, void>({
    //   query: () => '/example',
    // }),
  }),
});

// export const { useGetExampleQuery } = api;
