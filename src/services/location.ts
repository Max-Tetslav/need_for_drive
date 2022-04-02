import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { MAPBOX_REQUEST_HEADER_KEY } from '@utils/constants/mapboxData';

const needForDriveApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-factory.simbirsoft1.com/api/db',
  }),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getCitiesList: build.query({
      query: () => ({
        url: '/city',
        headers: {
          'X-Api-Factory-Application-Id': MAPBOX_REQUEST_HEADER_KEY,
        },
      }),
    }),
    getPointsList: build.query({
      query: () => ({
        url: '/point',
        headers: {
          'X-Api-Factory-Application-Id': MAPBOX_REQUEST_HEADER_KEY,
        },
      }),
    }),
  }),
});

export default needForDriveApi;
